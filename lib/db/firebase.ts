// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "portfolio-01-project-cult.firebaseapp.com",
  projectId: "portfolio-01-project-cult",
  storageBucket: "portfolio-01-project-cult.appspot.com",
  messagingSenderId: "407129336215",
  appId: "1:407129336215:web:2e39735dfa0648f79ebcd2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
