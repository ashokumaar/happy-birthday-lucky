// src/App.jsx
import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import HelloWorld from './components/HelloWorld';
// import VRScene from './components/VRScene';


function App() {
  const [started, setStarted] = useState(false);

  return (
    <>
      {!started ? (
        <StartScreen onStart={() => setStarted(true)} />
      ) : (
        <>
          <HelloWorld/>
          {/* <VRScene/>  */}
        </>
      )}
    </>
  );
}
export default App;