import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDn6knI4B7IF2EQUTkNjTZGbLr22rR3cPw",
  authDomain: "nft-firebase-81d4a.firebaseapp.com",
  projectId: "nft-firebase-81d4a",
  storageBucket: "nft-firebase-81d4a.appspot.com",
  messagingSenderId: "1075290906020",
  appId: "1:1075290906020:web:4d817d24d0e707c0e37531",
};

// Initialize Firebase
const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();
const db = getFirestore();
const storage = getStorage();
const auth = getAuth(firebaseApp);

export { db, storage, auth };
