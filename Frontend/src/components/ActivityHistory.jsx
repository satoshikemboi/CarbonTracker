import React, { useState, useEffect } from "react";
import Chart from "./Chart";

const ActivityHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("http://localhost:5000/api/activities"); // ✅ Flask endpoint

        if (!response.ok) {
          throw new Error("Failed to fetch activity data");
        }

        const data = await response.json();
        setHistory(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [page]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-600">
        Loading activity history...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-600 font-semibold">
        Error: {error}
      </div>
    );
  }

  const chartData = history.map((entry) => ({
    period: entry.date,
    co2: entry.co2Amount,
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Activity History
      </h1>

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
                    {entry.co2Amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Chart Section */}
      <section className="bg-green-50 rounded-xl p-6 shadow-inner mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Emission Trends
        </h2>
        <Chart data={chartData} />
      </section>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-5 py-2 rounded-lg font-semibold text-white transition ${
            page === 1 ? "bg-gray-400" : "bg-green-700 hover:bg-green-800"
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-5 py-2 rounded-lg font-semibold text-white bg-green-700 hover:bg-green-800 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ActivityHistory;

