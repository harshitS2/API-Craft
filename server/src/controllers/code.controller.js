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
            name: `getAll${modelName}`,
            code: `export const getAll${modelName} = async (req, res) => {
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
        }
    ];

    return controllerCode;
};
