import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app"
import "firebase/compat/storage";
import "firebase/compat/firestore"


export const app = firebase.initializeApp({
  "projectId": "zapas-56035",
  "appId": "1:305266544328:web:a09d4d75e1bf19919c9ffd",
  "storageBucket": "zapas-56035.appspot.com",
  "locationId": "southamerica-east1",
  "apiKey": "AIzaSyBhNLEEhfneLhbVZojVZnPXdSwzBMS0CBc",
  "authDomain": "zapas-56035.firebaseapp.com",
  "messagingSenderId": "305266544328"
});
//-------------zapas
// const firebaseConfig = {
//   apiKey: "AIzaSyBhNLEEhfneLhbVZojVZnPXdSwzBMS0CBc",
//   authDomain: "zapas-56035.firebaseapp.com",
//   projectId: "zapas-56035",
//   storageBucket: "zapas-56035.appspot.com",
//   messagingSenderId: "305266544328",
//   appId: "1:305266544328:web:76c9f917d9405b449c9ffd"
// };
//---------------zapatillas-proyecto
// const firebaseConfig = {
//   apiKey: "AIzaSyAauuDZYUBgVdRjJYAQeKo47RzgmMe38M0",
//   authDomain: "proyecto-zapatillas-6e2ce.firebaseapp.com",
//   projectId: "proyecto-zapatillas-6e2ce",
//   storageBucket: "proyecto-zapatillas-6e2ce.appspot.com",
//   messagingSenderId: "502350204377",
//   appId: "1:502350204377:web:5a448f49e111cf51da9dc8",
//   measurementId: "G-62NF4KXSGW",
// };

// export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app) 


