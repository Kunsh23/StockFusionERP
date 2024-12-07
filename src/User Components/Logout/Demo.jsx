import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Demo = () => {
  const [users, setUsers] = useState([]); // State to store users data
  const [error, setError] = useState(''); // State to store error messages
  const [loading, setLoading] = useState(true); // State for loader

  // Function to fetch users
  const fetchUsers = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get('http://localhost:8080/api/users/all', {
        withCredentials: true, // Ensures cookies are sent/received if needed
      });
      setUsers(response.data); // Set users data to state
    } catch (err) {
      setError('Failed to fetch users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h2>User List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              {user.name} - {user.email} {/* Adjust according to your response structure */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Demo;
