import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//-------------zapas
const firebaseConfig = {
  apiKey: "AIzaSyBhNLEEhfneLhbVZojVZnPXdSwzBMS0CBc",
  authDomain: "zapas-56035.firebaseapp.com",
  projectId: "zapas-56035",
  storageBucket: "zapas-56035.appspot.com",
  messagingSenderId: "305266544328",
  appId: "1:305266544328:web:76c9f917d9405b449c9ffd"
};
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

<<<<<<< HEAD
export const app = initializeApp(firebaseConfig); 
export const auth = getAuth(app)
=======
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app) 
>>>>>>> 8c93327168f6405b6eead134b0381966f67fff57


