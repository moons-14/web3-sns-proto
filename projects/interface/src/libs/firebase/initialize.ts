import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const app = initializeApp({
  apiKey: "AIzaSyAp_J-qZyHzudNxqwrHQilS4fCQTPgXYF0",
  authDomain: "web3-sns-dev.firebaseapp.com",
  projectId: "web3-sns-dev",
  storageBucket: "web3-sns-dev.appspot.com",
  messagingSenderId: "1096340701806",
  appId: "1:1096340701806:web:ecf3c3b0bd84fc6ab3dc7f",
  measurementId: "G-XGRCWXRVJD",
});

export const db = getFirestore(app);

export const analytics = getAnalytics(app);

export const auth = getAuth(app);
