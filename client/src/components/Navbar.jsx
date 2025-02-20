import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">API Craft</h1>
        <div className="space-x-6">
          <Link to="/" className="hover:text-blue-400">Home</Link>
          <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
          <Link to="/builder" className="hover:text-blue-400">API Builder</Link>
          <Link to="/testing" className="hover:text-blue-400">Testing</Link>
          <Link to="/deployment" className="hover:text-blue-400">Deployment</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
