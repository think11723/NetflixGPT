// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSQvWkZnDv8DnPxKzoj2XgSBBJgpvLwY0",
  authDomain: "netflixgpt-d2555.firebaseapp.com",
  projectId: "netflixgpt-d2555",
  storageBucket: "netflixgpt-d2555.firebasestorage.app",
  messagingSenderId: "832051562671",
  appId: "1:832051562671:web:b3c4550b2e9f0b7daa2c5a",
  measurementId: "G-DGTFRRDD8W"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const  auth = getAuth(app);