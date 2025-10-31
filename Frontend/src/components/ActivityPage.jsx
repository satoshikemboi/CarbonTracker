import React, { useState, useEffect } from "react";
import Chart from "./Chart"; // ✅ make sure Chart.jsx is in the same folder

const ActivityPage = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    type: "",
    description: "",
    co2Amount: "",
  });
  const [editingId, setEditingId] = useState(null);

  const API_URL = "https://trackerbackend-1-486n.onrender.com/api/activities/";

  // ✅ Fetch all activities from backend
  const fetchActivities = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_BASE);
      if (!response.ok) throw new Error("Failed to fetch activities");
      const data = await response.json();
      setActivities(data);
    } catch (err) {
      console.error("Error fetching activities:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  // ✅ Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle activity creation / update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsedCO2 = parseFloat(form.co2Amount);
    if (isNaN(parsedCO2)) return alert("Enter a valid CO₂ amount");

    const payload = {
      type: form.type,
      description: form.description,
      co2_amount: parsedCO2,
      user_id: 1, // ⚠️ Replace with actual logged-in user ID later
    };

    try {
      let response;

      if (editingId) {
        // Update functionality can be added later (PUT/PATCH endpoint)
        alert("Editing is not implemented yet.");
        return;
      } else {
        // Create new activity
        response = await fetch(API_BASE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!response.ok) throw new Error("Failed to save activity");
      await fetchActivities();
      setForm({ type: "", description: "", co2Amount: "" });
      setEditingId(null);
    } catch (err) {
      console.error("Error saving activity:", err);
      alert("Failed to save activity. Check console for details.");
    }
  };

  // ✅ Handle delete
  const handleDelete = async (id) => {
    // If your backend doesn’t have a DELETE route yet, handle locally
    setActivities((prev) => prev.filter((a) => a.id !== id));
  };

  // ✅ Chart data (aggregate per type)
  const chartData = Object.values(
    activities.reduce((acc, activity) => {
      const key = activity.type;
      if (!acc[key]) acc[key] = { period: key, co2: 0 };
      acc[key].co2 += parseFloat(activity.co2 || activity.co2_amount || 0);
      return acc;
    }, {})
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        Loading your activities...
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Log Your Daily Activities
      </h1>

      {/* Activity Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md mb-10 space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Activity Type
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select type</option>
              <option value="Transportation">Transportation</option>
              <option value="Energy Use">Energy Use</option>
              <option value="Meal">Meal</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description
            </label>
            <input
              name="description"
              type="text"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the activity"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Estimated CO₂ (kg)
            </label>
            <input
              name="co2Amount"
              type="number"
              step="0.01"
              value={form.co2Amount}
              onChange={handleChange}
              placeholder="e.g. 2.5"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition shadow-sm"
        >
          {editingId ? "Update Activity" : "Add Activity"}
        </button>

        {/* CO₂ Chart Section */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          CO₂ Emission Trends
        </h2>
        {chartData.length > 0 ? (
          <Chart data={chartData} />
        ) : (
          <p className="text-gray-500">No emission data available yet.</p>
        )}
      </div>
      </form>

      {/* Activity List */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Logged Activities
      </h2>

      {activities.length === 0 ? (
        <p className="text-gray-500">No activities logged yet.</p>
      ) : (
        <ul className="space-y-4">
          {activities.map((activity) => (
            <li
              key={activity.id}
              className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100"
            >
              <div>
                <p className="font-semibold text-green-700">{activity.type}</p>
                <p className="text-gray-600">{activity.description}</p>
                <p className="text-sm text-gray-500">
                  {activity.co2 || activity.co2_amount} kg CO₂
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleDelete(activity.id)}
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActivityPage;

