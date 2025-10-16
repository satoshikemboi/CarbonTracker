import React, { useState, useEffect } from 'react';
import CO2LineChart from './CO2LineChart';

const ActivityHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      // TODO: Replace with real API fetch
      const mockHistory = [
        { id: 101, date: '2024-05-10', type: 'Transportation', description: 'Car ride', co2Amount: 3.2 },
        { id: 102, date: '2024-05-09', type: 'Meal', description: 'Beef dinner', co2Amount: 5.6 },
        { id: 103, date: '2024-05-08', type: 'Meal', description: 'Vegetarian lunch', co2Amount: 1.3 },
        { id: 104, date: '2024-05-07', type: 'Energy Use', description: 'Home heating (gas)', co2Amount: 4.8 },
        { id: 105, date: '2024-05-06', type: 'Transportation', description: 'Train commute', co2Amount: 1.9 },
        { id: 106, date: '2024-05-05', type: 'Energy Use', description: 'Electricity for lighting', co2Amount: 2.7 },
        { id: 107, date: '2024-05-04', type: 'Meal', description: 'Fish dinner', co2Amount: 2.4 },
        { id: 108, date: '2024-05-03', type: 'Transportation', description: 'Bus ride', co2Amount: 0.9 },
        { id: 109, date: '2024-05-02', type: 'Energy Use', description: 'Air conditioning (2 hrs)', co2Amount: 3.5 },
        { id: 110, date: '2024-05-01', type: 'Meal', description: 'Plant-based meal', co2Amount: 0.8 },
      ];
      setHistory(mockHistory);
      setLoading(false);
    };
    fetchHistory();
  }, [page]);

  if (loading) {
    return <p>Loading activity history...</p>;
  }

  // Build data for chart: map each entry to { period, co2 }
  const chartData = history.map((entry) => ({
    period: entry.date,
    co2: entry.co2Amount,
  }));

  return (
    <div style={{ maxWidth: 1200, margin: 'auto', padding: 20 }}>
      <h1>Activity History</h1>

      {history.length === 0 ? (
        <p>No past activities found.</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', marginBottom: 20 }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Description</th>
              <th>CO₂ Emissions (kg)</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.date}</td>
                <td>{entry.type}</td>
                <td>{entry.description}</td>
                <td>{entry.co2Amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <section>
        <h2>Trends and Summaries</h2>
        <CO2LineChart data={chartData} />
      </section>

      <div style={{ marginTop: 20 }}>
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
          Previous
        </button>
        <button onClick={() => setPage((prev) => prev + 1)} style={{ marginLeft: 10 }}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ActivityHistory;
