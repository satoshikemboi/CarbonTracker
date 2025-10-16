import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  const [user, setUser] = useState(null);
  const [carbonSummary, setCarbonSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Simulate API / auth
      setUser({ name: 'Mary Itumo' });
      setCarbonSummary({
        weeklyCO2: 23.5,
        monthlyCO2: 95.2,
      });

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading homepage data...</p>;
  }

  if (!user) {
    return <p>Please log in to access CarbonTrack.</p>;
  }

  return (
    <div style={{ maxWidth: 1200, margin: 'auto', padding: 20 }}>
      <h1>Welcome to CarbonTrack, {user.name}!</h1>
      <section>
        <h2>Your Carbon Footprint Summary</h2>
        <p>Weekly CO₂ Emissions: {carbonSummary.weeklyCO2} kg</p>
        <p>Monthly CO₂ Emissions: {carbonSummary.monthlyCO2} kg</p>
      </section>
      <nav style={{ marginTop: 20 }}>
        <Link to="/activity" style={{ marginRight: 20 }}>
          Log Activities
        </Link>
        <Link to="/history">
          View Activity History
        </Link>
      </nav>
    </div>
  );
};

export default Homepage;