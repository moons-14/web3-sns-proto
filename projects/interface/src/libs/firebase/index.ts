import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

export const app = initializeApp({
  apiKey: "AIzaSyAn8w56Onf7QmnETsOLQ5ClfDmA2dfE7V0",
  authDomain: "web3-sns.firebaseapp.com",
  projectId: "web3-sns",
  storageBucket: "web3-sns.appspot.com",
  messagingSenderId: "689974200595",
  appId: "1:689974200595:web:1d288c04157d64de25f2e6",
  measurementId: "G-LK357Z67FQ",
});

export const db = getFirestore(app);

export const functions = getFunctions(app);

export const analytics = getAnalytics(app);
