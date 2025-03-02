import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useParams } from 'react-router-dom';
import { useApiStore } from '../store/useApiStore';



const ApiDisplay = () => {
  const [activeTab, setActiveTab] = useState('schema');
  const [expandedMethod, setExpandedMethod] = useState();
    const {id} = useParams();
    const {getAPIById} = useApiStore();
  const [api, setApi] = useState();
    useEffect(()=>{
        const fetchApi = async()=>{
            const api = await getAPIById(id);
            setApi(api);
        };
        fetchApi();
    }, [id]);
  const toggleMethod = (methodName) => {
    if (expandedMethod === methodName) {
      setExpandedMethod(null);
    } else {
      setExpandedMethod(methodName);
    }
  };
  if (!api) return <p>Loading API details...</p>;

  return (
    <div className="min-h-screen bg-base-200 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold  mb-8">API Documentation: {api.schemaName}</h1>

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
                  {api.schemaCode}
                </SyntaxHighlighter>
              </div>
            </div>
          )}

          {activeTab === 'controllers' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Controller Methods</h2>
              <div className="space-y-4">
                {api.controllerCode.map((method) => (
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
                  {api.routesCode}
                </SyntaxHighlighter>
              </div>
            </div>
          )}

          {activeTab === 'endpoints' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">API Endpoints</h2>
              <div className="grid grid-cols-1 gap-4">
                {Object.entries(api.apiPaths).map(([operation, path]) => (
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

export default ApiDisplay;