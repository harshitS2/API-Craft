import express from 'express';
import { createAPI, deleteApi, getAPIById, getAPIBySchemaName, getAPIs } from '../controllers/api.contoller.js';

const route = express.Router();

route.get('/', getAPIs);
route.get('/:schemaName', getAPIBySchemaName);
route.get('/:id', getAPIById);
route.post('/', createAPI);
route.delete('/:id', deleteApi);




export default route;