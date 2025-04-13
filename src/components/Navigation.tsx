"use client";

import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex space-x-4">
          <Link
            to="/"
            className={`px-3 py-2 rounded-md ${
              location.pathname === "/"
                ? "bg-blue-700 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Management
          </Link>
          <Link
            to="/public"
            className={`px-3 py-2 rounded-md ${
              location.pathname === "/public"
                ? "bg-blue-700 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Public View
          </Link>
        </div>
      </div>
    </nav>
  );
}
