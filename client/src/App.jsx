import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Import Navbar
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Builder from "./pages/Builder";
import Testing from "./pages/Testing";
import Deployment from "./pages/Deployment";

const App = () => (
  <Router>
    <Navbar /> {/* Navbar is outside Routes to display on all pages */}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/builder" element={<Builder />} />
      <Route path="/testing" element={<Testing />} />
      <Route path="/deployment" element={<Deployment />} />
    </Routes>
  </Router>
);

export default App;
