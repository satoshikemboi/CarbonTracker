
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Log Activity', path: '/activity' },
    { name: 'History', path: '/history' },
    { name: 'Profile', path: '/profile' },
  ];

  return (
    <nav
      style={{
        backgroundColor: '#1e293b',
        color: '#fff',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#38bdf8',
          textDecoration: 'none',
        }}
      >
        CarbonTrack
      </Link>

      {/* Nav Links */}
      <div style={{ display: 'flex', gap: '20px' }}>
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            style={{
              textDecoration: 'none',
              color: location.pathname === link.path ? '#38bdf8' : '#f1f5f9',
              fontWeight: location.pathname === link.path ? '600' : '400',
              borderBottom:
                location.pathname === link.path ? '2px solid #38bdf8' : '2px solid transparent',
              paddingBottom: '4px',
              transition: 'color 0.3s, border-bottom 0.3s',
            }}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* User Section (optional) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '0.95rem', color: '#cbd5e1' }}>Hi, Mary</span>
        <button
          style={{
            backgroundColor: '#38bdf8',
            color: '#0f172a',
            border: 'none',
            padding: '6px 14px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
