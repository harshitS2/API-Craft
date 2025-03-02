import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';


const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('schema');
  const [expandedMethod, setExpandedMethod] = useState();

  const apiData = {
    schemaName: "Resource",
    schemaCode: `
import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    }
});

export default mongoose.model('Resource', ResourceSchema);
    `,
    controllerCode: [
      {
        name: "getResource",
        code: `export const getResource = async (req, res) => {
                try {
                    const resource = await Resource.find();
                    res.status(200).json(resource);
                } catch (error) {
                    res.status(500).json({ message: error.message });
                }
            };`,
        _id: { $oid: "67c0aae97e8278a46a5e3eba" }
      },
      {
        name: "getResourceById",
        code: `export const getResourceById = async (req, res) => {
                const { id } = req.params;
                try {
                    const resource = await Resource.findById(id);
                    if (!resource) {
                        return res.status(404).json({ message: 'Resource not found' });
                    }
                    res.status(200).json(resource);
                } catch (error) {
                    res.status(500).json({ message: error.message });
                }
            };`,
        _id: { $oid: "67c0aae97e8278a46a5e3ebb" }
      },
      {
        name: "createResource",
        code: `export const createResource = async (req, res) => {
                const {email, name} = req.body;
                try {
                    const resource = await Resource.create({email, name});
                    res.status(201).json(resource);
                } catch (error) {
                    res.status(500).json({ message: error.message });
                }
            };`,
        _id: { $oid: "67c0aae97e8278a46a5e3ebc" }
      }
    ],
    routesCode: `
import express from "express";
import { getResource, getResourceById, createResource, updateResourceByID, deleteResource } from '../controllers/Resource.controller.js';

const router = express.Router();

router.get('/resource', getResource);
router.get('/resource/:id', getResourceById);
router.post('/resource', createResource);
router.put('/resource/:id', updateResourceByID);
router.delete('/resource/:id', deleteResource);

export default router;
    `,
    apiPaths: {
      create: "/resource",
      getAll: "/resource",
      getByID: "/resource/:id",
      update: "/resource/:id",
      delete: "/resource/:id"
    }
  };

  const toggleMethod = (methodName) => {
    if (expandedMethod === methodName) {
      setExpandedMethod(null);
    } else {
      setExpandedMethod(methodName);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold  mb-8">API Documentation: {apiData.schemaName}</h1>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded-lg ${activeTab === 'schema' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
            onClick={() => setActiveTab('schema')}
          >
            Schema
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${activeTab === 'controllers' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
            onClick={() => setActiveTab('controllers')}
          >
            Controllers
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${activeTab === 'routes' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
            onClick={() => setActiveTab('routes')}
          >
            Routes
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${activeTab === 'endpoints' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
            onClick={() => setActiveTab('endpoints')}
          >
            Endpoints
          </button>
        </div>

        {/* Content Sections */}
        <div className="bg-base-300 rounded-lg shadow-lg p-6">
          {activeTab === 'schema' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Schema Definition</h2>
              <div className="rounded-lg overflow-hidden">
                <SyntaxHighlighter language="javascript" style={tomorrow}>
                  {apiData.schemaCode}
                </SyntaxHighlighter>
              </div>
            </div>
          )}

          {activeTab === 'controllers' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Controller Methods</h2>
              <div className="space-y-4">
                {apiData.controllerCode.map((method) => (
                  <div key={method._id.$oid} className="border rounded-2xl">
                    <button
                      className="w-full px-4 py-2 text-left font-medium bg-base-400 hover:bg-base-100 border rounded-2xl flex justify-between items-center"
                      onClick={() => toggleMethod(method.name)}
                    >
                      <span>{method.name}</span>
                      <span className="text-gray-500">{expandedMethod === method.name ? '−' : '+'}</span>
                    </button>
                    {expandedMethod === method.name && (
                      <div className="p-4">
                        <SyntaxHighlighter language="javascript" style={tomorrow}>
                          {method.code}
                        </SyntaxHighlighter>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'routes' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Routes Configuration</h2>
              <div className="rounded-lg overflow-hidden">
                <SyntaxHighlighter language="javascript" style={tomorrow}>
                  {apiData.routesCode}
                </SyntaxHighlighter>
              </div>
            </div>
          )}

          {activeTab === 'endpoints' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">API Endpoints</h2>
              <div className="grid grid-cols-1 gap-4">
                {Object.entries(apiData.apiPaths).map(([operation, path]) => (
                  <div key={operation} className="bg-base-300 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-medium capitalize">{operation}:</span>
                      <span className="text-blue-600 font-mono">{path}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;