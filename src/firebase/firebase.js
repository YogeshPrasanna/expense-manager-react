import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";
import { getFirestore } from "firebase/firestore";

const config = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: "expense-manager-43d96.firebaseapp.com",
  databaseURL:
    "https://expense-manager-43d96-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "expense-manager-43d96",
  storageBucket: "expense-manager-43d96.appspot.com",
  messagingSenderId: "677485236984",
  appId: "1:677485236984:web:a8fcb8492d53814917e10d",
  measurementId: "G-2Q0196XQ95",
};

const app = firebase.initializeApp(config);

const db = getFirestore(app);
const auth = firebase.auth();

export { auth, db };
