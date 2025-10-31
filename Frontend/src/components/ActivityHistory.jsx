import React, { useState, useEffect } from "react";
import Chart from "./Chart"; // adjust path if needed

const ActivityHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "http://127.0.0.1:5000/api/activities/"; // Flask backend endpoint

  // ✅ Fetch from backend
  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch activity history");

        const data = await response.json();
        setHistory(data);
      } catch (err) {
        console.error("Error fetching activities:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // ✅ Prepare chart data
  const chartData = history.map((entry) => ({
    period: entry.date || "N/A",
    co2: parseFloat(entry.co2_amount || entry.co2 || 0),
  }));

  // ✅ Loading & Error UI
  if (loading)
    return (
      <div className="text-center py-20 text-gray-600">
        Loading activity history...
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20 text-red-600 font-semibold">
        Error: {error}
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Activity History
      </h1>

      {/* Table Section */}
      {history.length === 0 ? (
        <p className="text-center text-gray-500">No past activities found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-xl mb-10">
          <table className="w-full border-collapse rounded-xl overflow-hidden">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-left py-3 px-4">Type</th>
                <th className="text-left py-3 px-4">Description</th>
                <th className="text-left py-3 px-4">CO₂ Emissions (kg)</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry) => (
                <tr
                  key={entry.id}
                  className="border-b hover:bg-green-50 transition"
                >
                  <td className="py-3 px-4">{entry.date}</td>
                  <td className="py-3 px-4">{entry.type}</td>
                  <td className="py-3 px-4">{entry.description}</td>
                  <td className="py-3 px-4 font-semibold text-green-700">
                    {entry.co2_amount || entry.co2}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Chart Section */}
      <section className="bg-green-50 rounded-xl p-6 shadow-inner">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Emission Trends
        </h2>
        {chartData.length > 0 ? (
          <Chart data={chartData} />
        ) : (
          <p className="text-gray-500">No emission data to display.</p>
        )}
      </section>
    </div>
  );
};

export default ActivityHistory;


