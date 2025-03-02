import { useState } from "react";
import { PlusCircle, Trash2, Plus } from "lucide-react";
import { useApiStore } from "../store/useApiStore";

export default function CreateApi() {
  const [fields, setfields] = useState([]);
  const [httpMethod, setHttpMethod] = useState("GET");
  const [schemaName, setSchemaName] = useState("Resource");
  const [customField, setCustomField] = useState("");
  const {createApi} = useApiStore();
  const navigate = navigator;
  const preWrittenFields = [
    "name",
    "email",
    "phone",
    "dob",
    "address",
    "password",
    "status",
    "role",
  ];

  const addField = (fieldName) => {
    if (!fields.some((f) => f.name === fieldName)) {
      setfields([
        ...fields,
        { name: fieldName, type: "String", required: false, unique: false },
      ]);
    }
  };

  const removeField = (fieldName) => {
    setfields(fields.filter((f) => f.name !== fieldName));
  };

  // Update a specific field property
  const updateField = (fieldName, key, value) => {
    setfields(
      fields.map((field) =>
        field.name === fieldName ? { ...field, [key]: value } : field
      )
    );
  };

  const handleAddCustomField = () => {
    if (customField.trim() && !fields.some((f) => f.name === customField)) {
      addField(customField);
      setCustomField("");
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddCustomField();
    }
  };
  const generateApi=()=>{
    const data = {
      schemaName, fields
    }
    createApi(data);
    navigate('/dashboard')
  }
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-64px)]">
        {/* Left Sidebar */}
        <div className="w-full md:w-1/4 bg-gray-800 p-4 border-r border-gray-700 overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 text-indigo-400">
              Custom Field
            </h2>
            <div className="flex space-x-2">
              <input
                type="text"
                value={customField}
                onChange={(e) => setCustomField(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter field name"
                className="input flex-1 p-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleAddCustomField}
                className="p-2 bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
                aria-label="Add custom field"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          <h2 className="text-xl font-bold mb-4 text-indigo-400">
            Pre-written Fields
          </h2>
          <ul className="space-y-2">
            {preWrittenFields.map((field) => (
              <li key={field}>
                <button
                  className="w-full flex justify-between items-center p-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                  onClick={() => addField(field)}
                >
                  <span className="font-medium text-white">{field}</span>
                  <PlusCircle size={18} className="text-indigo-400" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-1/2 p-6 bg-gray-900 overflow-y-auto">
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <h2 className="text-2xl font-bold text-indigo-400">
                Schema Design
              </h2>

              <div className="w-full md:w-auto">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Schema Name
                </label>
                <input
                  type="text"
                  placeholder="Resource name"
                  value={schemaName}
                  onChange={(e) => setSchemaName(e.target.value)}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              HTTP Method
            </label>
            <select
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={httpMethod}
              onChange={(e) => setHttpMethod(e.target.value)}
            >
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>DELETE</option>
              <option>PATCH</option>
            </select>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-indigo-400">
              Selected Fields
            </h3>
            {fields.length === 0 ? (
              <div className="p-4 bg-gray-800 rounded-md text-gray-400 text-center border border-gray-700">
                No fields selected. Add fields from the sidebar.
              </div>
            ) : (
              <ul className="space-y-2 bg-gray-800 p-4 rounded-md border border-gray-700">
                {fields.map((field) => (
                  <li
                    key={field.name}
                    className="flex items-center justify-between p-2 bg-gray-700 rounded-md shadow-sm"
                  >
                    {/* Field Name */}
                    <span className="font-medium text-white flex-1">
                      {field.name}
                    </span>

                    {/* Type Dropdown */}
                    <select
                      value={field.type}
                      onChange={(e) =>
                        updateField(field.name, "type", e.target.value)
                      }
                      className="p-1 bg-gray-600 text-white rounded-md"
                    >
                      <option value="String">String</option>
                      <option value="Number">Number</option>
                      <option value="Boolean">Boolean</option>
                      <option value="Date">Date</option>
                      <option value="ObjectId">ObjectId</option>
                    </select>

                    {/* Required Checkbox */}
                    <label className="flex items-center space-x-1 text-sm text-white">
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={(e) =>
                          updateField(field.name, "required", e.target.checked)
                        }
                        className="w-4 h-4 accent-indigo-500"
                      />
                      <span>Required</span>
                    </label>

                    {/* Unique Checkbox */}
                    <label className="flex items-center space-x-1 text-sm text-white">
                      <input
                        type="checkbox"
                        checked={field.unique}
                        onChange={(e) =>
                          updateField(field.name, "unique", e.target.checked)
                        }
                        className="w-4 h-4 accent-indigo-500"
                      />
                      <span>Unique</span>
                    </label>

                    {/* Delete Button */}
                    <button
                      className="p-1 text-red-400 hover:bg-red-600 rounded-md transition-colors"
                      onClick={() => removeField(field.name)}
                      aria-label={`Remove ${field.name}`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full md:w-1/4 bg-gray-800 p-4 border-l border-gray-700 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4 text-indigo-400">
            API Preview
          </h2>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-300">
              API URL
            </h3>
            <div className="bg-gray-700 p-3 rounded-md border border-gray-600 font-mono text-sm text-white">
              /api/{schemaName.toLowerCase().replace(/\s+/g, "-")}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-300">
              Schema Definition
            </h3>
            <pre className="bg-gray-700 p-3 rounded-md border border-gray-600 overflow-x-auto text-sm font-mono text-white">
              {`{
  "method": "${httpMethod}",
  "fields": ${JSON.stringify(fields, null, 2)}
}`}
            </pre>
          </div>

          <div className="mt-6">
            <button className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium" onClick={generateApi}>
              Generate API
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
