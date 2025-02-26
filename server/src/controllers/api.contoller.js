import Api from "../models/Api.model";
import { generateSchemaCode } from "./code.controller.js";

export const getAPIs = async (req, res) => {
    try {
        const apis = await Api.find();
        res.status(200).json(apis);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAPIBySchemaName = async (req, res) => {
    try {
        const { schemaName } = req.params;
        const api = await Api.findOne({ schemaName });
        res.status(200).json(api);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAPIById = async (req, res) => {
    try {
        const { id } = req.params;
        const api = await Api.findById(id);
        res.status(200).json(api);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createAPI = async (req, res) => {
    const {schemaName, schemaDescription, feilds } = req.body;
    schemaCode = generateSchemaCode(schemaName, feilds);
    
    
}
