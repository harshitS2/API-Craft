import express from 'express';
import { createAPI, deleteApi, getAPIById, getAPIBySchemaName, getAPIs } from '../controllers/api.contoller.js';

const route = express.Router();

route.get('/apis', getAPIs);
route.get('/apis/schema/:schemaName', getAPIBySchemaName);
route.get('/apis/:id', getAPIById);
route.post('/', createAPI);
route.delete('/:id', deleteApi);




export default route;