import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import QrReader from 'react-qr-scanner'

function App() {
  const [result, setResult] = useState('No result');
  const [delay] = useState(100);

  function handleScan(data) {
    if (data) {
      setResult(data)
    }
  }
  function handleError(err) {
    console.error(err)
  }

  const previewStyle = {
    height: 240,
    width: 320,
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
        Learn React
        <QrReader
          delay={delay}
          style={previewStyle}
          onError={handleError}
          onScan={handleScan}
        />
        <p>{result}</p>
      </header>
    </div>
  );
}

export default App;
