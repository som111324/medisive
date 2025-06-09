// src/components/ErrorComponent.js
import React from "react";
import { useNavigate } from "react-router-dom";

function ErrorComponent() {
    const navigate = useNavigate();

    const handleGoToDashboard = () => {
        navigate("/dashboard"); // Navigate to the dashboard route
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="text-center bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
                <h2 className="text-3xl font-bold text-red-600 mb-4">
                    Something went wrong
                </h2>
                <p className="text-gray-700 mb-6">
                    We're sorry, but an unexpected error occurred. Please try
                    again or go back to the dashboard.
                </p>
                <button
                    onClick={handleGoToDashboard}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out"
                >
                    Go to Dashboard
                </button>
            </div>
        </div>
    );
}

export default ErrorComponent;
