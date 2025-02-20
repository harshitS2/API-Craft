import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <Link to="/builder" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
        Create New API
      </Link>
    </div>
  );
};

export default Dashboard;
