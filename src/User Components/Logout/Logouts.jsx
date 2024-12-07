import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // State for loader
  const navigate = useNavigate(); // Hook for navigation

  // Logout function
  const logout = async () => {
    setLoading(true); // Start loading
    try {
      // Trigger backend controller to clear cookies
      await axios.post('http://localhost:8080/api/auth/logout', {}, {
        withCredentials: true, // Ensures cookies are sent/received
      });

      // Redirect to login page after successful logout
      // navigate('/Demo');
    } catch (err) {
      setError('Failed to logout');
      console.error('Error logging out:', err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h2>Logout</h2>
      {loading ? (
        <p>Loading...</p> // Display loader when loading
      ) : (
        <button onClick={logout}>Logout</button>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Logout;
