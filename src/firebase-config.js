import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyD55AcPqfX6UuQUGakP8yidlVbG4LGi7tU",
  authDomain: "shoes-c17f7.firebaseapp.com",
  projectId: "shoes-c17f7",
  storageBucket: "shoes-c17f7.appspot.com",
  messagingSenderId: "879707590917",
  appId: "1:879707590917:web:51c587482513f9bc50e76c",
  measurementId: "G-GHQ9R954MV"
  // appId: "1:305266544328:web:76c9f917d9405b449c9ffd"
};


export const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);
export const auth = getAuth(app);



