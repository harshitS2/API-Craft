import React, { useEffect } from "react";
import { useApiStore } from "../store/useApiStore";
import { useNavigate } from "react-router-dom";

const Apis = () => {
  const { apis, getApis } = useApiStore();
  const navigate = useNavigate(); // ✅ useNavigate() should be here

  useEffect(() => {
    getApis();
  }, []);

  const apiByIdHandler = (id) => {
    navigate(`/api/${id}`); // ✅ Correct usage of navigate
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Some sample APIs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {apis.map((api, index) => (
          <div key={index} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src={`/placeholder.svg?height=200&width=300&text=Image ${index + 1}`}
                alt={`Placeholder ${index + 1}`}
                className="w-full h-48 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{api.schemaName}</h2>
              <p>This is a sample card description for {api.schemaName}.</p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  onClick={() => apiByIdHandler(api._id)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Apis;
