import { Link } from "react-router-dom";
import useApiStore from "../store/store";

const Home = () => {
  const apis = useApiStore((state) => state.apis);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white p-6">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-4">API Craft</h1>
        <p className="text-lg text-gray-300 max-w-lg mx-auto">
          A smart REST & GraphQL API builder with mock data and testing.
        </p>
        <Link 
          to="/builder"
          className="mt-6 inline-block px-6 py-3 text-lg font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg transition"
        >
          Create API
        </Link>
      </div>

      {/* Display Created APIs */}
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4">Your APIs</h2>
        {apis.length === 0 ? (
          <p className="text-gray-400">No APIs created yet. Start by creating one!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {apis.map((api) => (
              <div key={api.id} className="p-4 bg-gray-800 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold">{api.name}</h3>
                <p className="text-gray-400">Type: {api.type}</p>
                <p className="text-gray-500 text-sm">Created on: {api.createdAt}</p>
                <Link to={`/builder/${api.id}`} className="text-blue-400 hover:underline mt-2 block">
                  View API
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
