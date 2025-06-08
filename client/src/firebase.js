// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-d18ef.firebaseapp.com",
  projectId: "mern-estate-d18ef",
  storageBucket: "mern-estate-d18ef.firebasestorage.app",
  messagingSenderId: "546499576460",
  appId: "1:546499576460:web:f8fddc9a66f334cd0431a9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
