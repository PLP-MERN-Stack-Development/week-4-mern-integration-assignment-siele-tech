import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="bg-primary-600 text-white py-4 px-6 mb-6 flex justify-between items-center">
      <div className="font-bold text-lg">
        <Link to="/">MERN Blog</Link>
      </div>
      <div className="space-x-4 flex items-center">
        <Link to="/" className="hover:text-primary-200">Home</Link>
        {user ? (
          <>
            <Link to="/posts/new" className="hover:text-primary-200">New Post</Link>
            <span className="text-primary-200">
              Welcome, {user.firstName}!
            </span>
            <button
              onClick={handleLogout}
              className="hover:text-primary-200"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-primary-200">Login</Link>
            <Link to="/register" className="hover:text-primary-200">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar; 