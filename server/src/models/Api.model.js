import mongoose from "mongoose";

const apiSchema = new mongoose.Schema({
    schemaName: {
        type: String,
        required: true,
        unique: true,
    },
    schemaCode: {
        type: String,
        required: true,
    },
    schemaDescription: {
        type: String,
    },
    controllerCode: [
        {
          name: { type: String, required: true }, 
          code: { type: String, required: true } 
        }
      ],
    
    routesCode: { type: String, required: true },
    apiPaths: {
        create: { type: String, required: true },
        getAll: { type: String, required: true },
        update: { type: String, required: true },
        delete: { type: String, required: true }
      },
    
}, { timestamps: true });

const Api = mongoose.model("Api", apiSchema);

export default Api;

