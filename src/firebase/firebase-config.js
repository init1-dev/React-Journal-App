import 'firebase/firestore';
import 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCOTZtnGq6_DGkY4EwdWs6sv2exqlpblg",
  authDomain: "react-app-cursos-44814.firebaseapp.com",
  projectId: "react-app-cursos-44814",
  storageBucket: "react-app-cursos-44814.appspot.com",
  messagingSenderId: "345575439562",
  appId: "1:345575439562:web:989dd565f5decbce390833"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const googleAuthProvider = new GoogleAuthProvider();

export{
    db,
    googleAuthProvider
}