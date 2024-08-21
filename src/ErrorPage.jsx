// src/components/ErrorPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-red-500">404</h1>
        <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
        <p className="text-gray-600 mt-2">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="inline-block mt-6 px-6 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700 transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
