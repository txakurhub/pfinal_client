// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOrAUl7fGRGg-zr8RVLJKzKnDnOVDQBkI",
  authDomain: "pf-henry-d13cc.firebaseapp.com",
  projectId: "pf-henry-d13cc",
  storageBucket: "pf-henry-d13cc.appspot.com",
  messagingSenderId: "479952293709",
  appId: "1:479952293709:web:a22a520900efad7af67104",
  measurementId: "G-C2HLW1RYXE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
const analytics = getAnalytics(app);