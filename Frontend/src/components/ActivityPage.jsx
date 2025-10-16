import React, { useState, useEffect } from "react";

const ActivityPage = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [form, setForm] = useState({
    type: "",
    description: "",
    co2Amount: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      try {
        // Replace this mock with an API call later
        const mockData = [
          { id: 1, type: "Transportation", description: "Bus to work", co2Amount: 2.3 },
          { id: 2, type: "Meal", description: "Vegetarian lunch", co2Amount: 1.1 },
          { id: 3, type: "Transportation", description: "Taxi home", co2Amount: 4.5 },
          { id: 4, type: "Energy Use", description: "Home electricity usage", co2Amount: 3.8 },
          { id: 5, type: "Meal", description: "Beef dinner", co2Amount: 5.6 },
          { id: 6, type: "Transportation", description: "Bike ride", co2Amount: 0.0 },
          { id: 7, type: "Energy Use", description: "Air conditioning (1 hour)", co2Amount: 2.2 },
          { id: 8, type: "Meal", description: "Plant-based meal", co2Amount: 0.9 },
          { id: 9, type: "Transportation", description: "Train commute", co2Amount: 1.7 },
          { id: 10, type: "Energy Use", description: "Heating (gas)", co2Amount: 3.3 },
        ];
        setActivities(mockData);
      } catch (err) {
        console.error("Error fetching activities:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [page]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedCO2 = parseFloat(form.co2Amount);
    if (isNaN(parsedCO2)) return alert("Enter a valid CO₂ amount");

    if (editingId) {
      setActivities((prev) =>
        prev.map((a) =>
          a.id === editingId ? { ...a, ...form, co2Amount: parsedCO2 } : a
        )
      );
      setEditingId(null);
    } else {
      const newActivity = {
        id: Date.now(),
        type: form.type,
        description: form.description,
        co2Amount: parsedCO2,
      };
      setActivities((prev) => [newActivity, ...prev]);
    }

    setForm({ type: "", description: "", co2Amount: "" });
  };

  const handleEdit = (activity) => {
    setEditingId(activity.id);
    setForm({
      type: activity.type,
      description: activity.description,
      co2Amount: activity.co2Amount.toString(),
    });
  };

  const handleDelete = (id) => {
    setActivities((prev) => prev.filter((a) => a.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setForm({ type: "", description: "", co2Amount: "" });
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        Loading your activities...
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        🌱 Log Your Daily Activities
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

        <div className="flex gap-3 mt-4">
          <button
            type="submit"
            className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition shadow-sm"
          >
            {editingId ? "Update Activity" : "Add Activity"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm({ type: "", description: "", co2Amount: "" });
              }}
              className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition shadow-sm"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Activity List */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Activities (Page {page})
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
                <p className="font-semibold text-green-700">
                  {activity.type}
                </p>
                <p className="text-gray-600">{activity.description}</p>
                <p className="text-sm text-gray-500">
                  {activity.co2Amount} kg CO₂
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(activity)}
                  className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition"
                >
                  Edit
                </button>
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

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ActivityPage;
