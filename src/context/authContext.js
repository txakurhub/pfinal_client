import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
<<<<<<< HEAD
  FacebookAuthProvider,
  sendSignInLinkToEmail 
=======
  FacebookAuthProvider
>>>>>>> 8c0b75575b54587267975d2f9aaff4ac98e2c26e
} from "firebase/auth";
import {  sendEmailVerification } from "firebase/auth";
import { auth, app } from "../firebase-config";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { local_url } from "../redux/actions";
import { async } from "@firebase/util";
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
      }).then(res=>{
        verify()
      })
      const docuRef = doc(firestore, `user/${infoUser.user.uid}`);
      console.log(docuRef);
      setDoc(docuRef, {  email:email,
        password:password,
        image:image,
        firstname:firstname,
        lastname:lastname,
        phone:phone,
        admin:admin,
        banned:banned})
    } catch (err) {
      console.log(err + "  - - -  error en signup");
    }
  };
  console.log(auth.currentUser)
  const verify =async ()=>{
    sendEmailVerification(auth.currentUser)
      .then(() => {
        // Email verification sent!
        // ...
      });
  }

  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'https://zapas-56035.firebaseapp.com',
    // This must be true.
    handleCodeInApp: true,
    iOS: {
      bundleId: 'com.example.ios'
    },
    android: {
      packageName: 'com.example.android',
      installApp: true,
      minimumVersion: '12'
    },
    dynamicLinkDomain: 'https://zapas-56035.firebaseapp.com'
  };
  
  const email = 'me.leandrop@gmail.com'

  const signup2 = async ()=>{
    const result = await sendSignInLinkToEmail(auth, email, actionCodeSettings)
  .then(() => {
    // The link was successfully sent. Inform the user.
    // Save the email locally so you don't need to ask the user for it again
    // if they open the link on the same device.
    window.localStorage.setItem('emailForSignIn', email);
    // ...
    console.log(result)
  })
  .catch((error) => {
    console.log(error)
    // ...
  });
  }

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
        signup2
      }}
    >
      {children}
    </authContext.Provider>
  );
}
