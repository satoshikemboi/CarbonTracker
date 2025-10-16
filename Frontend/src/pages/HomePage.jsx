import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [user, setUser] = useState(null);
  const [carbonSummary, setCarbonSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Simulate API / auth
      setUser({ name: "Mary Itumo" });
      setCarbonSummary({
        weeklyCO2: 23.5,
        monthlyCO2: 95.2,
      });

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-medium text-gray-600">
        Loading homepage data...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center">
        <p className="text-xl text-gray-700 mb-4">
          Please log in to access <span className="font-semibold">CarbonTrack</span>.
        </p>
        <Link
          to="/login"
          className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Welcome to <span className="text-green-600">CarbonTrack</span>, {user.name}! 🌿
      </h1>

      {/* Summary Card */}
      <section className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Your Carbon Footprint Summary
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-green-50 p-4 rounded-xl text-center shadow-sm">
            <p className="text-gray-500 text-sm uppercase tracking-wide">
              Weekly CO₂ Emissions
            </p>
            <p className="text-3xl font-bold text-green-700">
              {carbonSummary.weeklyCO2} kg
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-xl text-center shadow-sm">
            <p className="text-gray-500 text-sm uppercase tracking-wide">
              Monthly CO₂ Emissions
            </p>
            <p className="text-3xl font-bold text-green-700">
              {carbonSummary.monthlyCO2} kg
            </p>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <nav className="flex gap-4">
        <Link
          to="/activity"
          className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition"
        >
          Log Activities
        </Link>

        <Link
          to="/history"
          className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg shadow-md transition"
        >
          View Activity History
        </Link>
      </nav>
    </div>
  );
};

export default Homepage;
