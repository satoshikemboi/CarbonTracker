import React, { useState, useEffect } from 'react';

const ActivityPage = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [form, setForm] = useState({
    type: '',
    description: '',
    co2Amount: '',
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      try {
        // Replace this mock with an API call later
        const mockData = [
          { id: 1, type: 'Transportation', description: 'Bus to work', co2Amount: 2.3 },
          { id: 2, type: 'Meal', description: 'Vegetarian lunch', co2Amount: 1.1 },
          { id: 3, type: 'Transportation', description: 'Taxi home', co2Amount: 4.5 },
          { id: 4, type: 'Energy Use', description: 'Home electricity usage', co2Amount: 3.8 },
          { id: 5, type: 'Meal', description: 'Beef dinner', co2Amount: 5.6 },
          { id: 6, type: 'Transportation', description: 'Bike ride', co2Amount: 0.0 },
          { id: 7, type: 'Energy Use', description: 'Air conditioning (1 hour)', co2Amount: 2.2 },
          { id: 8, type: 'Meal', description: 'Plant-based meal', co2Amount: 0.9 },
          { id: 9, type: 'Transportation', description: 'Train commute', co2Amount: 1.7 },
          { id: 10, type: 'Energy Use', description: 'Heating (gas)', co2Amount: 3.3 },
        ];
        setActivities(mockData);
      } catch (err) {
        console.error('Error fetching activities:', err);
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
    if (isNaN(parsedCO2)) return alert('Enter a valid CO₂ amount');

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

    setForm({ type: '', description: '', co2Amount: '' });
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
      setForm({ type: '', description: '', co2Amount: '' });
    }
  };

  if (loading) return <p>Loading your activities...</p>;

  return (
    <div style={{ maxWidth: 1200, margin: 'auto', padding: 20 }}>
      <h1>Log Daily Activities</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <div>
          <label>
            Activity Type:&nbsp;
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              required
            >
              <option value="">Select type</option>
              <option value="Transportation">Transportation</option>
              <option value="Energy Use">Energy Use</option>
              <option value="Meal">Meal</option>
            </select>
          </label>
        </div>

        <div>
          <label>
            Description:&nbsp;
            <input
              name="description"
              type="text"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the activity"
              required
            />
          </label>
        </div>

        <div>
          <label>
            Estimated CO₂ Emissions (kg):&nbsp;
            <input
              name="co2Amount"
              type="number"
              step="0.01"
              value={form.co2Amount}
              onChange={handleChange}
              placeholder="e.g. 2.5"
              required
            />
          </label>
        </div>

        <button type="submit" style={{ marginTop: 10 }}>
          {editingId ? 'Update Activity' : 'Add Activity'}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({ type: '', description: '', co2Amount: '' });
            }}
            style={{ marginLeft: 10 }}
          >
            Cancel
          </button>
        )}
      </form>

      <h2>Activities (Page {page})</h2>
      {activities.length === 0 ? (
        <p>No activities logged yet.</p>
      ) : (
        <ul>
          {activities.map((activity) => (
            <li key={activity.id} style={{ marginBottom: 10 }}>
              <strong>{activity.type}</strong>: {activity.description} —{' '}
              {activity.co2Amount} kg CO₂
              <button style={{ marginLeft: 10 }} onClick={() => handleEdit(activity)}>
                Edit
              </button>
              <button style={{ marginLeft: 5 }} onClick={() => handleDelete(activity.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: 20 }}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <button onClick={() => setPage((prev) => prev + 1)} style={{ marginLeft: 10 }}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ActivityPage;
