import React from "react";

import { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import {
  FaMagic,
  FaCode,
  FaUsers,
  FaServer,
  FaBook,
  FaChartLine,
} from "react-icons/fa";

export default function Home() {
  const [numberOfCards, setNumberOfCards] = useState(8);

  useEffect(() => {
    setNumberOfCards(8);
  }, []);

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
              Craft seamless APIs with precision. Collaborate, automate, and
              scale—all in one place.
            </p>
            <Link to={'/create-api'} className="btn btn-primary btn-lg gap-2">
              Start Crafting for Free
              <FaMagic />
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature Cards */}
          {[
            {
              icon: <FaMagic />,
              title: "Visual API Designer",
              desc: "select or type your way to perfect endpoints",
            },
            {
              icon: <FaCode />,
              title: "Smart Code Generation",
              desc: "From blueprint to code in seconds",
            },
            {
              icon: <FaUsers />,
              title: "Real-Time Collaboration",
              desc: "Teamwork makes the API work",
            },
            {
              icon: <FaServer />,
              title: "Mock Servers & Testing",
              desc: "Test early, test often",
            },
            {
              icon: <FaBook />,
              title: "Documentation Hub",
              desc: "Docs that developers love",
            },
            {
              icon: <FaChartLine />,
              title: "API Analytics",
              desc: "Monitor, optimize, repeat",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
            >
              <div className="card-body">
                <div className="text-4xl text-primary mb-4">{feature.icon}</div>
                <h2 className="card-title">{feature.title}</h2>
                <p>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-base-200">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            What Developers Say
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="card bg-base-100">
              <div className="card-body">
                <p>
                  "API Craft cut our development time in half. The visual
                  designer and auto-generated SDKs are game-changers!"
                </p>
                <div className="mt-4 font-bold">Maria T.</div>
                <div className="text-sm opacity-70">Lead Backend Engineer</div>
              </div>
            </div>
            <div className="card bg-base-100">
              <div className="card-body">
                <p>
                  "Finally a tool that bridges the gap between our dev and
                  product teams. Collaboration is effortless."
                </p>
                <div className="mt-4 font-bold">Sam R.</div>
                <div className="text-sm opacity-70">CTO</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Some sample APIs
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(numberOfCards)].map((_, index) => (
            <div key={index} className="card bg-base-100 shadow-xl">
              <figure>
                <img
                  src={`/placeholder.svg?height=200&width=300&text=Image ${
                    index + 1
                  }`}
                  alt={`Placeholder ${index + 1}`}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Card {index + 1}</h2>
                <p>This is a sample card description for Card {index + 1}.</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
        {/* Footer CTA */}
        <footer className="footer footer-center p-10 bg-primary text-primary-content">
        <div>
          <h2 className="text-4xl font-bold mb-6">
            APIs are the backbone of modern software
          </h2>
          <p className="text-xl mb-6">Build yours with the right tools</p>
          <button className="btn btn-accent btn-lg">Try API Craft Today</button>
        </div>
      </footer>
    </div>
  );
}
