import { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import CreateApi from "./pages/CreateApi";

function App() {
  const { checkAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={authUser ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/create-api" element={<CreateApi />} />
      </Routes>
      <Toaster />
    </BrowserRouter>

  );
}
export default App;
