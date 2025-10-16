
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ActivityPage from './components/ActivityPage';
import ActivityHistory from './components/ActivityHistory';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/activity" element={<ActivityPage />} />
        <Route path="/history" element={<ActivityHistory />} />
        <Route
          path="*"
          element={
            <h2 style={{ textAlign: 'center', marginTop: '50px' }}>
              404 - Page Not Found
            </h2>
          }
        />
      </Routes>
    </>
  );
}

export default App;
