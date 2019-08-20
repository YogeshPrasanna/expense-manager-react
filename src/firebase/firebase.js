import * as firebase from "firebase";

const config = {
    apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
    authDomain: "expense-manager-712af.firebaseapp.com",
    databaseURL: "https://expense-manager-712af.firebaseio.com",
    projectId: "expense-manager-712af",
    storageBucket: "",
    messagingSenderId: "438737817312",
    appId: "1:438737817312:web:daecd20d3d63bc9e"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export { auth, db };
