
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ActivityPage from './components/ActivityPage';
import ActivityHistory from './components/ActivityHistory';
import AIRecommendations from './components/AIRecommendations';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';

function App() {
  const location = useLocation();

  // Hide Navbar on login and signup pages
  const hideNavbar =
    location.pathname === '/' || location.pathname === '/signup';

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Show login page by default */}
        <Route path="/" element={<LoginPage />} />

        {/* Signup page */}
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected pages */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/activity" element={<ActivityPage />} />
        <Route path="/history" element={<ActivityHistory />} />
        <Route path="/recommendations" element={<AIRecommendations />} />

        {/* 404 page */}
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
