import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAauuDZYUBgVdRjJYAQeKo47RzgmMe38M0",
  authDomain: "proyecto-zapatillas-6e2ce.firebaseapp.com",
  projectId: "proyecto-zapatillas-6e2ce",
  storageBucket: "proyecto-zapatillas-6e2ce.appspot.com",
  messagingSenderId: "502350204377",
  appId: "1:502350204377:web:5a448f49e111cf51da9dc8",
  measurementId: "G-62NF4KXSGW",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)


