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
import axios from "axios";
import { local_url } from "../redux/actions";
export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  return context;
};
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (
   { email,
    password,
    image,
    firstname,
    lastname,
    phone,
    admin,
    banned
   }) => {
    try {
      const firestore = getFirestore(app);
      const infoUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        image,
        firstname,
        lastname,
        phone,
        admin,
        banned
      ).then((fireUser) => {
        console.log(fireUser);
        return fireUser;
      });
      const docuRef = doc(firestore, `user/${infoUser.user.uid}`);
      console.log(docuRef);
      setDoc(docuRef, {  email:email,
        password:password,
        image:image,
        firstname:firstname,
        lastname:lastname,
        phone:phone,
        admin:admin,
        banned:banned});
    } catch (err) {
      console.log(err + "  - - -  error en signup");
    }
  };

  const login = async (email, password) =>
    await signInWithEmailAndPassword(auth, email, password);

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
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

  const userData = () => {
    return user;
  };

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
        userData,
      }}
    >
      {children}
    </authContext.Provider>
  );
}