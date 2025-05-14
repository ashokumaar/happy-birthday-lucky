// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyEL7l8rh-J7A9J7fAjF1sqqJzKVkdPS8",
  authDomain: "birthday-vr-project.firebaseapp.com",
  projectId: "birthday-vr-project",
  storageBucket: "birthday-vr-project.firebasestorage.app",
  messagingSenderId: "72274614126",
  appId: "1:72274614126:web:ff245cce4cd943c853937f",
  measurementId: "G-3MF319KG0M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };