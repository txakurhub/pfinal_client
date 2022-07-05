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
import { sendEmailVerification } from "firebase/auth";
import { auth, app } from "../firebase-config";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { local_url } from "../redux/actions";
import { async } from "@firebase/util";
import { LocalStorage } from "./LocalStorage";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  return context;
};
export function AuthProvider({ children }) {
  const [user, setUser] = LocalStorage("user",{})
  const [loading, setLoading] = useState(true);

  const signup = async ({
    email,
    password,
    firstname,
    lastname,
    phone,
    admin,
    banned,
  }) => {
    try {
      const firestore = getFirestore(app);
      const infoUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        firstname,
        lastname,
        phone,
        admin,
        banned,
      )
        .then((fireUser) => {
          const docuRef = doc(firestore, `user/${fireUser.user.uid}`);
          setDoc(docuRef, {
            email: email,
            password: password,
            firstname: firstname,
            lastname: lastname,
            phone: phone,
            admin: admin,
            banned: banned,
          })
        })
        .then((res) => {
          verify();
        })

    } catch (err) {
      console.log(err + "  - - -  error en signup");
    }
  };



  const verify = async () => {
    sendEmailVerification(auth.currentUser).then(() => {
      // Email verification sent!
      // ...
    });
  };

  const login = async (email, password) =>
    await signInWithEmailAndPassword(auth, email, password);

  const loginWithGoogle = () => {
    const firestore = getFirestore(app);
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then(cred => {
        const docuRef = doc(firestore, `user/${cred.user.uid}`);
        console.log(firestore);
        setDoc(docuRef, {
          email: cred.user.email,
          displayName: cred.user.displayName,
          photoURL: cred.user.photoURL,
          admin: false,
          banned: false,
          firstname: "",
          lastname: "",
          phone: "",
          image:""
        })
      })
  }


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
