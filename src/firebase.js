// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Mettre des variables d'environnement
const firebaseConfig = {
  apiKey: "AIzaSyDgygEQ6R6FAglb2Un5pvOii7eeQS4MbjM",
  authDomain: "unifree-91a27.firebaseapp.com",
  projectId: "unifree-91a27",
  storageBucket: "unifree-91a27.appspot.com",
  messagingSenderId: "987551538863",
  appId: "1:987551538863:web:9407c2fa3482a19f543e5a"
};


// Initialize Firebase
export const Url = "https://firebasestorage.googleapis.com/v0/b/unifree-91a27.appspot.com/o/"
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
