// src/components/BirthdayScene.jsx
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage } from '@react-three/drei';
import * as THREE from 'three';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import messages from '../utils/birthdayWishes.js';
import './BirthdayScene.css';

function CakeModel() {
  const { scene } = useGLTF('/cake.glb');
  const cakeRef = useRef();

  React.useEffect(() => {
    if (cakeRef.current) {
      cakeRef.current.rotation.y = THREE.MathUtils.degToRad(275);
    }
  }, []);

  return <primitive object={scene} ref={cakeRef} scale={0.5} />;
}

function Balloons() {
  const balloonRefs = useRef([]);

  useFrame(() => {
    balloonRefs.current.forEach((balloon) => {
      if (balloon) {
        balloon.position.y += 0.005;
        if (balloon.position.y > 5) {
          balloon.position.y = -2;
        }
      }
    });
  });

  return (
    <group>
      {[...Array(5)].map((_, i) => (
        <mesh
          key={i}
          ref={(ref) => (balloonRefs.current[i] = ref)}
          position={[i - 2, -2, -1]}
        >
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color={`hsl(${i * 60}, 100%, 50%)`} />
        </mesh>
      ))}
    </group>
  );
}

function FloatingStars() {
  const starRefs = useRef([]);

  useFrame(() => {
    starRefs.current.forEach((star) => {
      if (star) {
        star.rotation.y += 0.01;
        star.rotation.x += 0.01;
      }
    });
  });

  return (
    <group>
      {[...Array(20)].map((_, i) => (
        <mesh
          key={i}
          ref={(ref) => (starRefs.current[i] = ref)}
          position={[
            Math.random() * 4 - 2,
            Math.random() * 4,
            Math.random() * 4 - 2,
          ]}
        >
          <octahedronGeometry args={[0.05, 0]} />
          <meshStandardMaterial color="white" emissive="yellow" />
        </mesh>
      ))}
    </group>
  );
}

export default function BirthdayScene() {
  const [lightsOn, setLightsOn] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  const [currentMessage, setCurrentMessage] = useState(null);
  const [appLoaded, setAppLoaded] = useState(false);
  // const message = ' Wishing You a Fantastic Year Ahead! 🎉';

  useEffect(() => {
    // This is just a simulation of app finishing loading.
    // Replace this timeout or logic with actual content-loaded detection.
    const loadTimeout = setTimeout(() => {
      setAppLoaded(true);
    }, 1000); // wait 1s before considering app fully rendered

    return () => clearTimeout(loadTimeout);
  }, []);

  useEffect(() => {
    let intervalId;

    if (appLoaded) {
      intervalId = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * messages.length);
        setCurrentMessage(messages[randomIndex].value);
      }, 3000); // every 2 seconds
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [appLoaded]);

  const handleCelebrate = () => {
    setShowConfetti(true);
    const audio = new Audio('/birthday.mp3');
    audio.play();
  };

  if (!lightsOn) {
    return (
      <div className="black-screen">
        <button className="lights-button" onClick={() => setLightsOn(true)}>
          Lights On
        </button>
      </div>
    );
  }

  return (
    <div className="birthday-wrapper">
      <Canvas camera={{ position: [0, 1.5, 3] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 5]} />
        <Stage environment="city" intensity={0.6}>
          <CakeModel />
          <Balloons />
          <FloatingStars />
        </Stage>
        <OrbitControls />
      </Canvas>

      <div className="controls">
        {!showConfetti && (
          <button onClick={handleCelebrate}>Celebrate</button>
        )}
        <div style={{ marginTop: '20px', fontSize: '1.2rem', color: '#e91e63' }}>
          {currentMessage && <p>{currentMessage}</p>}
        </div>
      </div>
      {showConfetti && <Confetti width={width} height={height} />}
    </div>
  );
}
