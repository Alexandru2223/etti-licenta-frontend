// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCmM_xuHSEfMCWjup_34M49T5coLAkINiA",
    authDomain: "licenta-7fd41.firebaseapp.com",
    projectId: "licenta-7fd41",
    storageBucket: "licenta-7fd41.appspot.com",
    messagingSenderId: "667766596710",
    appId: "1:667766596710:web:6732893f67435239ca39a7",
    measurementId: "G-9CVH5LSLLH"
};

// Initialize Firebase
let app;

if (firebase.apps.length === 0){
     app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth();

const db = app.firestore();

export {auth, db}
