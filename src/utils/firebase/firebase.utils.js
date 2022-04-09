import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdVi5yblwF013cGAMDetDxhqyFU-bQKWg",
  authDomain: "crwn-clothing-db-cd927.firebaseapp.com",
  projectId: "crwn-clothing-db-cd927",
  storageBucket: "crwn-clothing-db-cd927.appspot.com",
  messagingSenderId: "890995358553",
  appId: "1:890995358553:web:20503d9772f5f8ecceaa48",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists());

  if(!userSnapshot.exists()){
    const { displayName, email} = userAuth;
    const createAt = new Date();

    try {
      await setDoc(userDocRef, {displayName, email, createAt});
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};
