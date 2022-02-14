import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import QrReader from 'react-qr-scanner'

function App() {
  const [result, setResult] = useState('No result');
  const [delay] = useState(100);
  const [devices, setDevices] = useState([]);
  const [cameraId, setCameraId] = useState(0);

  useEffect(() => {
    navigator?.mediaDevices.enumerateDevices()
    .then((devices_result) => {
      const videoSelect = []
      devices_result.forEach((device) => {
        if (device.kind === 'videoinput') {
          videoSelect.push(device)
        }
      })
      return videoSelect
    })
    .then((devices_result) => {
      setDevices(devices_result);
    })
    .catch((error) => {
      console.log(error)
    })
  }, []);

  function handleScan(data) {
    if (data) {
      console.log(data);
      setResult(data)
    }
  }
  function handleError(err) {
    console.error(err)
  }

  const selectCamera = () => cameraId;

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
        <p>{result.text}</p>
        <QrReader
          delay={delay}
          style={previewStyle}
          onError={handleError}
          onScan={handleScan}
          //chooseDeviceId={selectCamera}
          constraints={{ audio: false, video: { deviceId: cameraId } }}
        />
        <select
          onChange={e => {
            const value = e.target.value
            setCameraId(value)
          }}
        >
          {devices.map((deviceInfo, index) => (
            <React.Fragment key={deviceInfo.deviceId}><option value={deviceInfo.deviceId}>{deviceInfo.label || `camera ${index}`}</option></React.Fragment>
          ))}
        </select>
      </header>
    </div>
  );
}

export default App;
