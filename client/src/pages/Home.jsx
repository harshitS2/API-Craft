import React from "react";
import { Link } from "react-router-dom";
import { FaMagic, FaCode, FaUsers, FaServer, FaBook, FaChartLine } from "react-icons/fa";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="hero from-base-200 to-base-100 py-16">
        <div className="hero-content text-center">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold mb-6">
              Build, Test, and Deploy APIs Faster Than Ever
            </h1>
            <p className="text-xl mb-8">
              Craft seamless APIs with precision. Collaborate, automate, and scale—all in one place.
            </p>
            <Link to="/create-api" className="btn btn-primary btn-lg gap-2">
              Start Crafting for Free <FaMagic />
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: <FaMagic />, title: "Visual API Designer", desc: "Design APIs effortlessly" },
            { icon: <FaCode />, title: "Smart Code Generation", desc: "Auto-generate clean code" },
            { icon: <FaUsers />, title: "Real-Time Collaboration", desc: "Work with your team seamlessly" },
            { icon: <FaServer />, title: "Mock Servers & Testing", desc: "Test APIs before deployment" },
            { icon: <FaBook />, title: "Documentation Hub", desc: "Generate and manage API docs" },
            { icon: <FaChartLine />, title: "API Analytics", desc: "Track and optimize performance" },
          ].map((feature, index) => (
            <div key={index} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body">
                <div className="text-4xl text-primary mb-4">{feature.icon}</div>
                <h2 className="card-title">{feature.title}</h2>
                <p>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 py-8 text-center">
        <Link to="/apis" className="btn btn-primary btn-lg gap-2">
          Explore Sample APIs <FaMagic />
        </Link>
      </div>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-primary text-primary-content">
        <div>
          <h2 className="text-4xl font-bold mb-6">APIs are the backbone of modern software</h2>
          <p className="text-xl mb-6">Build yours with the right tools</p>
          <button className="btn btn-accent btn-lg ">Try API Craft Today</button>
        </div>
      </footer>
    </div>
  );
}
