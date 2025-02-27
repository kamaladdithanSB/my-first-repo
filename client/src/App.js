import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  // State to store response from the backend
  const [apiResponse, setApiResponse] = useState('');

  // useEffect to make the API request when the component mounts
  useEffect(() => {
    // Make a GET request to the backend API
    fetch('http://localhost:5000/api/test')
      .then((response) => response.json())
      .then((data) => {
        // Set the response in state
        setApiResponse(data.message);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          {/* Display the API response */}
          {apiResponse ? apiResponse : 'Loading...'}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
