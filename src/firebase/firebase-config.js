import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLPzfUJ8D0tEC_udawzJdZH0siZkuOgPE",
  authDomain: "react-app-cursos-bfeb5.firebaseapp.com",
  projectId: "react-app-cursos-bfeb5",
  storageBucket: "react-app-cursos-bfeb5.appspot.com",
  messagingSenderId: "377800514955",
  appId: "1:377800514955:web:95d6bb2e8f5535c014e38e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export {
    db,
    googleAuthProvider,
    firebase
}