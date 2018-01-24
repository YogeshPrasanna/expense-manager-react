import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCLgp-lM7vLypzhkakWCt4FD2nh7pd4W08",
    authDomain: "expense-manager-react.firebaseapp.com",
    databaseURL: "https://expense-manager-react.firebaseio.com",
    projectId: "expense-manager-react",
    storageBucket: "expense-manager-react.appspot.com",
    messagingSenderId: "847044394910"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
    auth, db
};