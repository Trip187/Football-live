// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAolvMD9vNdkVkAZ8PFRHHkqtQQofiwUoc",
  authDomain: "football-live-6059d.firebaseapp.com",
  projectId: "football-live-6059d",
  storageBucket: "football-live-6059d.firebasestorage.app",
  messagingSenderId: "344636850611",
  appId: "1:344636850611:web:8cb1075b00729e486a4bc6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signOutUser = async () => await signOut(auth);
export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};
