import React, { useState, useEffect } from 'react';
import Chart from './Chart'; // assuming this component handles visualization

const ActivityHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      // Simulate API
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
    return (
      <div style={{ textAlign: 'center', padding: '50px 0', color: '#666' }}>
        <p>Loading activity history...</p>
      </div>
    );
  }

  const chartData = history.map((entry) => ({
    period: entry.date,
    co2: entry.co2Amount,
  }));

  return (
    <div style={{ maxWidth: '1200px', margin: 'auto', padding: '30px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px', color: '#1e293b' }}>
        Activity History
      </h1>

      {history.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#6b7280' }}>No past activities found.</p>
      ) : (
        <div
          style={{
            overflowX: 'auto',
            boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
            borderRadius: '10px',
            background: '#fff',
            marginBottom: '30px',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              borderRadius: '10px',
              overflow: 'hidden',
            }}
          >
            <thead style={{ background: '#1e293b', color: '#fff' }}>
              <tr>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Description</th>
                <th style={styles.th}>CO₂ Emissions (kg)</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry) => (
                <tr key={entry.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={styles.td}>{entry.date}</td>
                  <td style={styles.td}>{entry.type}</td>
                  <td style={styles.td}>{entry.description}</td>
                  <td style={{ ...styles.td, fontWeight: 'bold', color: '#2563eb' }}>
                    {entry.co2Amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '10px', color: '#1e293b' }}>
          Trends and Summaries
        </h2>
        <div
          style={{
            background: '#f8fafc',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.03)',
          }}
        >
          <Chart data={chartData} />
        </div>
      </section>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          style={{
            ...styles.button,
            backgroundColor: page === 1 ? '#9ca3af' : '#2563eb',
          }}
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          style={{ ...styles.button, marginLeft: '15px', backgroundColor: '#2563eb' }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

// Inline reusable style objects
const styles = {
  th: {
    textAlign: 'left',
    padding: '12px 15px',
    fontWeight: '600',
    fontSize: '0.95rem',
  },
  td: {
    padding: '12px 15px',
    fontSize: '0.9rem',
    color: '#334155',
  },
  button: {
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background 0.3s',
  },
};

export default ActivityHistory;
