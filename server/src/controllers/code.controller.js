export const generateSchemaCode = async (schemaName, fields) => {
    const schemaCode = `
import mongoose from 'mongoose';

const ${schemaName.toLowerCase()}Schema = new mongoose.Schema({
    ${fields
            .map(
                (field) => `${field.name}: {
        type: ${field.type},
        required: ${field.required},
        ${field.unique ? 'unique: true,' : ''}
    }`
            )
            .join(",\n")}
});

export default mongoose.model('${schemaName}', ${schemaName}Schema);
    `;
    return schemaCode;
};

export const generateControllerCode = (schemaName, fields) => {
    const modelName = schemaName.charAt(0).toUpperCase() + schemaName.slice(1);
    const controllerCode = [
        {
            name: `get${modelName}`,
            code: `export const get${modelName} = async (req, res) => {
                try {
                    const ${schemaName.toLowerCase()} = await ${modelName}.find();
                    res.status(200).json(${schemaName.toLowerCase()});
                } catch (error) {
                    res.status(500).json({ message: error.message });
                }
            };`
        },
        {
            name: `get${modelName}ById`,
            code: `export const get${modelName}ById = async (req, res) => {
                const { id } = req.params;
                try {
                    const ${schemaName.toLowerCase()} = await ${modelName}.findById(id);
                    if (!${schemaName.toLowerCase()}) {
                        return res.status(404).json({ message: '${modelName} not found' });
                    }
                    res.status(200).json(${schemaName.toLowerCase()});
                } catch (error) {
                    res.status(500).json({ message: error.message });
                }
            };`
        },
        {
            name: `create${modelName}`,
            code: `export const create${modelName} = async (req, res) => {
                const {${fields.map(field => field.name).join(', ')}} = req.body;
                try {
                    const ${schemaName.toLowerCase()} = await ${modelName}.create({${fields.map(field => field.name).join(', ')}});
                    res.status(201).json(${schemaName.toLowerCase()});
                } catch (error) {
                    res.status(500).json({ message: error.message });
                }
            };`
        },
        {
            name: `update${modelName}ByID`,
            code: `export const update${modelName}ByID = async (req, res) => {
                const { id } = req.params;
                const {${fields.map(field => field.name).join(', ')}} = req.body;
                try {
                    const updated${modelName} = await ${modelName}.findByIdAndUpdate(id, {${fields.map(field => field.name).join(', ')}}, { new: true });
                    if (!updated${modelName}) {
                        return res.status(404).json({ message: '${modelName} not found' });
                    }
                    res.status(200).json(updated${modelName});
                } catch (error) {
                    res.status(500).json({ message: error.message });
                }
            };`
        },
        {
            name: `delete${modelName}`,
            code: `export const delete${modelName} = async (req, res) => {
                const { id } = req.params;
                try {
                    const deleted${modelName} = await ${modelName}.findByIdAndDelete(id);
                    if (!deleted${modelName}) {
                        return res.status(404).json({ message: '${modelName} not found' });
                    }
                    res.status(200).json({ message: '${modelName} deleted successfully' });
                } catch (error) {
                    res.status(500).json({ message: error.message });
                }
            };`
        },
    ];

    return controllerCode;
};

export const generateRoutesCode = (schemaName) => {
    const modelName = schemaName.charAt(0).toUpperCase() + schemaName.slice(1);
    const routes = `
import express from "express";
import { get${modelName}, get${modelName}ById, create${modelName}, update${modelName}ByID, delete${modelName} } from '../controllers/${schemaName}.controller.js';

const router = express.Router();

router.get('/${schemaName.toLowerCase()}', get${modelName});
router.get('/${schemaName.toLowerCase()}/:id', get${modelName}ById);
router.post('/${schemaName.toLowerCase()}', create${modelName});
router.put('/${schemaName.toLowerCase()}/:id', update${modelName}ByID);
router.delete('/${schemaName.toLowerCase()}/:id', delete${modelName});

export default router;
    `;
    return routes;
};


export const apiPathGenerator = (schemaName) => {
    const basePath = `/${schemaName.toLowerCase()}`;

    return {
        create: basePath,
        getAll: basePath,
        getByID: `${basePath}/:id`, 
        update: `${basePath}/:id`,
        delete: `${basePath}/:id`
    };
};