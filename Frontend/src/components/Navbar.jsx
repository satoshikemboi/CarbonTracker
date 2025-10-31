// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false); // mobile menu

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      setUser(stored ? JSON.parse(stored) : null);
    } catch (e) {
      setUser(null);
    }
  }, [location]); // update when location changes (e.g., after logout)

  const handleLogout = () => {
    // remove auth data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // optionally clear other app state here

    // navigate to login (assuming login is at "/")
    navigate("/");

    // update local state so UI updates immediately
    setUser(null);

    // optionally close mobile menu
    setOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "Log Activity", path: "/activity" },
    { name: "History", path: "/history" },
    { name: "Recommendations", path: "/recommendations" },
  ];

  return (
    <header className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* logo */}
          <div className="flex-shrink-0">
            <Link to="/home" className="text-2xl font-bold text-sky-400 hover:text-sky-300 transition-colors">
              CarbonTrack
            </Link>
          </div>

          {/* desktop nav */}
          <div className="hidden md:flex md:items-center md:gap-8">
            <nav className="flex gap-6">
              {navLinks.map((link) => {
                const active = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`pb-1 text-base font-medium transition-colors border-b-2 ${
                      active
                        ? "text-sky-400 border-sky-400"
                        : "text-slate-100 border-transparent hover:text-sky-300 hover:border-sky-300"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* user / logout */}
            <div className="flex items-center gap-3 ml-6">
              {user ? (
                <>
                  <span className="text-slate-300 text-sm">Hi, {user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-sky-400 text-slate-900 font-semibold px-4 py-1.5 rounded-md hover:bg-sky-300 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/"
                  className="bg-sky-400 text-slate-900 font-semibold px-4 py-1.5 rounded-md hover:bg-sky-300 transition-colors"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* mobile: hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen((s) => !s)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-200 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-expanded={open}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* mobile menu */}
      {open && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700">
          <div className="px-4 pt-4 pb-6 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setOpen(false)}
                className={`block text-base font-medium transition-colors ${
                  location.pathname === link.path ? "text-sky-400" : "text-slate-100 hover:text-sky-300"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-3 border-t border-slate-700">
              {user ? (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm">Hi, {user.name}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="ml-4 bg-sky-400 text-slate-900 font-semibold px-3 py-1 rounded-md hover:bg-sky-300 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/" onClick={() => setOpen(false)} className="block bg-sky-400 text-slate-900 px-3 py-1.5 rounded-md">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

