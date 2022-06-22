//https://firebase.google.com/docs/auth/web/start?authuser=3

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import firebase from 'firebase'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAauuDZYUBgVdRjJYAQeKo47RzgmMe38M0",
  authDomain: "proyecto-zapatillas-6e2ce.firebaseapp.com",
  projectId: "proyecto-zapatillas-6e2ce",
  storageBucket: "proyecto-zapatillas-6e2ce.appspot.com",
  messagingSenderId: "502350204377",
  appId: "1:502350204377:web:5a448f49e111cf51da9dc8",
  measurementId: "G-62NF4KXSGW",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
// const analytics = getAnalytics(app);

