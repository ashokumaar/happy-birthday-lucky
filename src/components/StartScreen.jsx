import React from 'react';
import './StartScreen.css';

export default function StartScreen({ onStart }) {
  return (
    <div className="start-screen">
      <h1>🎂 Happy Birthday 🎈</h1>
      <p>Tap below to enter the surprise 3D Room</p>
      <button onClick={onStart}>Enter VR Room</button>
    </div>
  );
}
