import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useFirebaseApp, useUser } from "reactfire";
import { initializeApp } from "firebase/app";
import { app } from "../firebase-config";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const firebase = useFirebaseApp();
  const user = useUser();

  const auth = getAuth(app);
  const db = getFirestore(app);

  const handleSubmit = async () => {
    const submit = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    console.log(submit());
  };

  const handleLogin = async () => {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  };
  const handleLogout = async () => {
    await firebase.auth().signOut();
  };

  return (
    <main>
      {user.email && (
        <div>
          <h4>Hola {user.email}</h4>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      )}
      {!user && (
        <div>
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSubmit}>Registrarme</button>
          <button onClick={handleLogin}>Iniciar Sesión</button>
        </div>
      )}
    </main>
  );
}

export default Login;
