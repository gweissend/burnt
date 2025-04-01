// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVPxo5Ffb1S42Q1ZVgmk8kpfMEzI6H_JY",
  authDomain: "burnt-90e26.firebaseapp.com",
  projectId: "burnt-90e26",
  storageBucket: "burnt-90e26.firebasestorage.app",
  messagingSenderId: "285053510895",
  appId: "1:285053510895:web:57af43849e947736bae71a",
  measurementId: "G-ETGEYTWDTD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);