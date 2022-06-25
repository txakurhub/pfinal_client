import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth, app } from "../firebase-config";
import { getFirestore, doc, setDoc } from "firebase/firestore";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email, password, role = "user") => {
    try {
      const firestore = getFirestore(app);
      const infoUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        role
      ).then((fireUser) => {
        return fireUser;
      });
      console.log(infoUser.user.uid);
      const docuRef = doc(firestore, `users/${infoUser.user.uid}`);
      setDoc(docuRef, { email: email, role: role });
    } catch (err) {
      console.log(err + "  - - -  error en signup");
    }
  };

  const login = async (email, password) =>
    await signInWithEmailAndPassword(auth, email, password);

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then((re) => console.log(re))
      .catch((err) => console.log(err));
  };

  const loginWithFacebook = () => {
    const facebookProvider = new FacebookAuthProvider();
    signInWithPopup(auth, facebookProvider)
      .then((re) => console.log(re))
      .catch((err) => console.log(err));
  };

  const resetPassword = (email) => {
    sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unSubscribe;
  }, []);

  const logout = () => signOut(auth);

  return (
    <authContext.Provider
      value={{
        signup,
        login,
        user,
        logout,
        loading,
        loginWithGoogle,
        loginWithFacebook,
        resetPassword,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
