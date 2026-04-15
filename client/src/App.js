import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello from React!</h1>
        <p>API URL: {process.env.REACT_APP_API_URL}</p>
        <p>This app is running in Docker</p>
      </header>
    </div>
  );
}

export default App;
