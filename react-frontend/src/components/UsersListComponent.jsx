import React, { useEffect, useState } from 'react';

const UsersListComponent = () => {
  const [users, setUsers] = useState([]); // Set initial state to an empty array
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    // Define an async function to fetch the users
    const fetchCars = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data); // Set the users to state
      } catch (error) {
        setError(error.message); // Handle errors
      } finally {
        setLoading(false); // Set loading to false once data is fetched or error occurs
      }
    };

    fetchCars(); // Call the async function
  }, []); // Empty dependency array, so it runs once when the component mounts

  // Render loading, error, or the list of users
  return (
    <div>
      <h1>Users from Express:</h1>
      {loading && <p>Loading...</p>} {/* Show loading if data is being fetched */}
      {error && <p>Error: {error}</p>} {/* Show error message if there was an error */}
      {!loading && !error && (
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.nombre} - {user.edad} - {user.email} - {user.type}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersListComponent;