import React, { useEffect, useState } from 'react';

const MessageComponent = () => {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // Fetch the message from the Express API
    fetch('http://localhost:5000/api/v2/message')
      .then(response => response.json())
      .then(data => {
        setMessage(data.message); // Set the message to state
      })
      .catch(error => {
        console.error('Error fetching the message:', error);
      });
  }, []); // Empty dependency array, so it runs once when the component mounts

  return (
    <div>
      <h1>Message from Express:</h1>
      {message ? <p>{message}</p> : <p>Loading...</p>}
    </div>
  );
};

export default MessageComponent;