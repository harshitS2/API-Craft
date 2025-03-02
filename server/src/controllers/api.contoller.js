import Api from "../models/Api.model.js";
import { apiPathGenerator, generateControllerCode, generateRoutesCode, generateSchemaCode } from "./code.controller.js";

export const getAPIs = async (req, res) => {
    try {
        const apis = await Api.find();
        res.status(200).json(apis);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAPIBySchemaName = async (req, res) => {
    try {
        const { schemaName } = req.params;
        const api = await Api.findOne({ schemaName });
        if (!api) {
            return res.status(404).json({ message: "API not found" });
        }
        res.status(200).json(api);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAPIById = async (req, res) => {
    try {
        const { id } = req.params;
        const api = await Api.findById(id);
        if (!api) {
            return res.status(404).json({ message: "API not found" });
        }
        res.status(200).json(api);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createAPI = async (req, res) => {
    const { schemaName, schemaDescription, fields } = req.body;

    if (!schemaName || !fields || !Array.isArray(fields) || fields.length === 0) {
        return res.status(400).json({ message: "Schema name and fields are required." });
    }

    const schemaCode = await generateSchemaCode(schemaName, fields);
    const controllerCode = generateControllerCode(schemaName, fields);
    const routesCode = generateRoutesCode(schemaName);
    const apiPaths = apiPathGenerator(schemaName);

    // If user is logged in, save to DB
    if (req.user) {
        try {
            const isAvailable = await Api.findOne({ schemaName });
            if (isAvailable) {
                return res.status(400).json({ message: "Schema Name already exists, please search and proceed." });
            }

            const newSchema = new Api({
                schemaName,
                schemaDescription,
                schemaCode,
                controllerCode,
                routesCode,
                apiPaths
            });

            await newSchema.save();

            return res.status(201).json(newSchema);
        } catch (error) {
            console.error(`Server Error: ${error.message}`);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    // If user is NOT logged in, return API details but do NOT save
    return res.status(200).json({
        schemaName,
        schemaDescription,
        schemaCode,
        controllerCode,
        routesCode,
        apiPaths,
        message: "This API was not saved. Log in to save it."
    });
};

//Need to update it for updation of APIs
export const updateApi = async(req, res)=>{
    const {id} = req.params;
    const { schemaName, schemaDescription, fields } = req.body;
    try {
        const updatedApi = await Api.findByIdAndUpdate(id, {schemaName, schemaDescription, fields});
    } catch (error) {
        console.error(`Server Error: ${error.message}`);
        res.status(500).json({ message: "Internal Server Error" });

    }
}
//...........................

export const deleteApi = async(req, res)=>{
    const {id} = req.params;
    try{
        const api = await Api.findByIdAndDelete(id);
        res.status(200).json({message: "Deleted Successfully", api});
    }
    catch(error){
        console.error(`Server Error: ${error.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
