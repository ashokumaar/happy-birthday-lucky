// import React, { useState } from 'react';
// import { VRCanvas, Controllers, Hands, DefaultXRControllers } from '@react-three/xr';
// import { OrbitControls, Stars, Text, Html } from '@react-three/drei';
// import { useFrame } from '@react-three/fiber';
// import { db } from '../firebase';
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// function FloatingText() {
//   const [positionY, setPositionY] = useState(1);

//   useFrame((state, delta) => {
//     setPositionY((prev) => prev + Math.sin(state.clock.elapsedTime) * 0.0005);
//   });

//   return (
//     <Text
//       fontSize={0.4}
//       position={[0, positionY, -3]}
//       color="hotpink"
//       anchorX="center"
//       anchorY="middle"
//     >
//       Happy Birthday ❤️
//     </Text>
//   );
// }

// function MessageForm() {
//   const [name, setName] = useState('');
//   const [message, setMessage] = useState('');
//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!name || !message) return;
//     try {
//       await addDoc(collection(db, 'messages'), {
//         name,
//         message,
//         timestamp: serverTimestamp(),
//       });
//       setSubmitted(true);
//       setName('');
//       setMessage('');
//     } catch (error) {
//       console.error('Error saving message:', error);
//     }
//   };

//   return (
//     <Html position={[0, 1, -2]}>
//       <div className="form-container">
//         {!submitted ? (
//           <form onSubmit={handleSubmit}>
//             <input
//               type="text"
//               placeholder="Your name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//             <textarea
//               placeholder="Birthday message"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               required
//             />
//             <button type="submit">Send Wish</button>
//           </form>
//         ) : (
//           <p className="thanks">🎉 Thank you for your wish!</p>
//         )}
//       </div>
//     </Html>
//   );
// }

// export default function VRScene() {
//   return (
//     <VRCanvas>
//       <ambientLight intensity={0.5} />
//       <pointLight position={[10, 10, 10]} />
//       <Stars />
//       <Controllers />
//       <DefaultXRControllers />
//       <Hands />

//       <FloatingText />
//       <MessageForm />

//       <OrbitControls enablePan={false} enableZoom={false} />
//     </VRCanvas>
//   );
// }

// src/components/VRScene.jsx
import React from 'react';
import { VRCanvas, DefaultXRControllers, Hands } from '@react-three/xr';
import { OrbitControls } from '@react-three/drei';
import { Box, Sphere } from '@react-three/drei';
import { Suspense } from 'react';

// Optional: Firebase setup (only if you actually need Firestore in this component)
// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';

// Firebase config (replace with your own or remove this block if unused)
// const firebaseConfig = {
//   apiKey: "AIzaSyAyEL7l8rh-J7A9J7fAjF1sqqJzKVkdPS8",
//   authDomain: "birthday-vr-project.firebaseapp.com",
//   projectId: "birthday-vr-project",
//   storageBucket: "birthday-vr-project.firebasestorage.app",
//   messagingSenderId: "72274614126",
//   appId: "1:72274614126:web:ff245cce4cd943c853937f",
//   measurementId: "G-3MF319KG0M"
// };

// Initialize Firebase only once
// try {
//   initializeApp(firebaseConfig);
//   // const db = getFirestore(); // Use only if needed
// } catch (e) {
//   // App already initialized or config error
//   console.warn('Firebase init error:', e.message);
// }

const VRScene = () => {
  return (
    <VRCanvas>
      <ambientLight />
      <pointLight position={[5, 5, 5]} />
      <Suspense fallback={null}>
        <Box position={[0, 1.5, -3]}>
          <meshStandardMaterial color="hotpink" />
        </Box>
        <Sphere position={[2, 1, -3]}>
          <meshStandardMaterial color="cyan" />
        </Sphere>
      </Suspense>
      <DefaultXRControllers />
      <Hands />
      <OrbitControls />
    </VRCanvas>
  );
};

export default VRScene;
