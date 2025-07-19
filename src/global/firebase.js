// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDPmPiTGOHNkKNHEKA1mwCnbOrEGSDC5P4",
  authDomain: "task-manager-3ca2c.firebaseapp.com",
  projectId: "task-manager-3ca2c",
  storageBucket: "task-manager-3ca2c.firebasestorage.app",
  messagingSenderId: "1094687700134",
  appId: "1:1094687700134:web:c0ab15354834a3cddeb067",
  measurementId: "G-P03YWL0Y14",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
