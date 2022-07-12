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
import { getFirestore, doc, setDoc, collection, getDoc } from "firebase/firestore";
import { local_url } from "../redux/actions";
import { async } from "@firebase/util";
import { LocalStorage } from "./LocalStorage";
import swal from "sweetalert";
export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  return context;
};
export function AuthProvider({ children }) {
  const [userStorage, setUserStorage] = LocalStorage("user",{}) 
  const [user, setUser] = useState(null);
  const [userInf, setUserInf] = useState(null);
  const [loading, setLoading] = useState(true);
  const db = getFirestore();

  const signup = async ({
    email,
    password,
    firstname,
    lastname,
    phone,
    admin=false,
    banned=false,
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

  const login = async (email, password) =>{
     await signInWithEmailAndPassword(auth, email, password).then(async cred=>{
      const docuRef = await doc(db, `user/${cred.user.uid}`)
      const findUser = await getDoc(docuRef);
      await isBannedUser(findUser.data())
    });
    
  }

  const isBannedUser =  async (user)=> {
    if(user.banned){
      localStorage.clear();
      setUser(null)
      setUserStorage({})
       await signOut(auth) // se supone que cierra sesion
      throw new Error("Lo siento por algún motivo te han suspendido de la página")
    }
    // sino tiene ban entra joya 
  }
  

  const loginWithGoogle = () => {
    const firestore = getFirestore(app);
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then(async cred => {
        const docuRef = await doc(firestore, `user/${cred.user.uid}`);
        const findUser = await getDoc(docuRef);
        const found = findUser.data()
        if(found){
          await isBannedUser(found)
        }else{
          setDoc(docuRef, {
            email: cred.user.email,
            displayName: cred.user.displayName,
            photoURL: cred.user.photoURL,
            admin: false,
            banned: false,
            firstname: cred.user.displayName.split(" ")[0],
            lastname: cred.user.displayName.split(" ")[1],
            phone: "",
            image: ""
          })
        }
      }).catch(error=>{
        signOut(auth)
        swal("Error",error.message,"error")
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

  const userInfo = async (currentUser) => {
    const users = doc(db, 'user', currentUser.uid);
    const docSnap = await getDoc(users);
    setUserInf({...docSnap.data(),uid:currentUser.uid})
    setUserStorage({...docSnap.data(),uid:currentUser.uid});
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        userInfo(currentUser)
        setUser(currentUser);
      } else {
        setUserInf(null)
      }
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
        userInfo,
        login,
        user,
        userInf,
        logout,
        loading,
        userStorage,
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