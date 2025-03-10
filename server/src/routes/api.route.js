import express from 'express';
import { createAPI, deleteApi, getAPIById, getAPIBySchemaName, getAPIs } from '../controllers/api.contoller.js';
import { authMiddleware } from '../middleware/auth.middleware.js'

const route = express.Router();

route.get('/apis', getAPIs);
route.get('/apis/schema/:schemaName', getAPIBySchemaName);
route.get('/apis/:id', getAPIById);
route.post('/api', authMiddleware, createAPI);
route.delete('/:id',authMiddleware, deleteApi);




export default route;