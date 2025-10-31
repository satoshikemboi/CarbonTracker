import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [carbonSummary, setCarbonSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setCarbonSummary({
        weeklyCO2: 23.5,
        monthlyCO2: 95.2,
        yearlyCO2: 1120.8,
      });
    }
    setLoading(false);
  }, []);
  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-green-50 to-green-100 text-lg font-medium text-gray-700">
        Loading your data...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50 text-center px-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Please log in to continue to{" "}
          <span className="text-green-600 font-bold">CarbonTrack</span>.
        </h2>
        <Link
          to="/login"
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex flex-col items-center py-12 px-4 sm:px-8">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between max-w-6xl w-full mb-12 gap-8">
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left space-y-4 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            Welcome back,{" "}
            <span className="text-green-600">{user.name}</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-md mx-auto md:mx-0">
            Track your carbon footprint, log your activities, and see how your
            daily actions impact our planet.
          </p>
          <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
            <Link
              to="/activity"
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md text-lg font-semibold transition transform hover:-translate-y-1"
            >
              Log New Activity
            </Link>
            <Link
              to="/history"
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg shadow-md text-lg font-semibold transition transform hover:-translate-y-1"
            >
              View History
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex-1 flex justify-center">
          <img
            src="green.png"
            alt="Eco illustration"
            className="w-72 sm:w-96 object-contain drop-shadow-xl animate-float"
          />
        </div>
      </section>

      {/* Carbon Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {[
          { label: "Weekly CO₂ Emissions", value: carbonSummary.weeklyCO2 },
          { label: "Monthly CO₂ Emissions", value: carbonSummary.monthlyCO2 },
          { label: "Yearly CO₂ Emissions", value: carbonSummary.yearlyCO2 },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 p-6 text-center border border-green-100"
          >
            <h3 className="text-gray-500 uppercase text-sm mb-2">
              {item.label}
            </h3>
            <p className="text-4xl font-bold text-green-600">{item.value} kg</p>
          </div>
        ))}
      </section>

      {/* Quote / Footer */}
      <footer className="mt-16 text-center max-w-2xl">
        <p className="italic text-gray-500">
          “The greatest threat to our planet is the belief that someone else
          will save it.” – Robert Swan
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
