import { useState } from "react";
import { PlusCircle, Trash2 } from "lucide-react";

export default function CreateApi() {
  const [selectedFields, setSelectedFields] = useState([]);
  const [httpMethod, setHttpMethod] = useState("GET");
  const [schemaName, setSchemaName] = useState("Resource");
  const preWrittenFields = [
    "id",
    "name",
    "email",
    "phone",
    "dob",
    "address",
    "password",
    "status",
    "role",
  ];

  const addField = (field) => {
    setSelectedFields([...selectedFields, field]);
  };

  const removeField = (field) => {
    setSelectedFields(selectedFields.filter((f) => f !== field));
  };

  return (
    <div className=" overflow-y-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Left Sidebar */}
        <div className="w-full md:w-1/4 bg-base-200 p-4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Pre-written Fields</h2>
          <ul>
            {preWrittenFields.map((field) => (
              <li key={field} className="mb-2">
                <button
                  className="btn btn-sm btn-outline w-full justify-between"
                  onClick={() => addField(field)}
                >
                  {field}
                  <PlusCircle size={16} />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-1/2 p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            {/* Schema Design Heading */}
            <h2 className="text-xl font-bold">Schema Design</h2>

            {/* Input Field */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">What is your Schema About?</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                value={schemaName}
                onChange={(e) => setSchemaName(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="label">
              <span className="label-text">HTTP Method</span>
            </label>

            <select
              className="select select-bordered w-full"
              value={httpMethod}
              onChange={(e) => setHttpMethod(e.target.value)}
            >
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>DELETE</option>
            </select>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Selected Fields</h3>
            <ul>
              {selectedFields.map((field) => (
                <li
                  key={field}
                  className="mb-2 flex items-center justify-between"
                >
                  <span>{field}</span>
                  <button
                    className="btn btn-sm btn-ghost"
                    onClick={() => removeField(field)}
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full md:w-1/4 bg-base-200 p-4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">API Preview</h2>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">API URL</h3>
            <code className="block bg-base-300 p-2 rounded">/api/{schemaName}</code>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Model.js</h3>
            <pre className="bg-base-300 p-2 rounded overflow-x-auto">
              {JSON.stringify(
                { method: httpMethod, fields: selectedFields },
                null,
                2
              )}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
