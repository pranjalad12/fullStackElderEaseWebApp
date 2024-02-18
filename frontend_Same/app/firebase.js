// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDPq7T3VDqGL7Y2i-2JiAUhPuofyZf0lkQ",

  authDomain: "elder-ease-1141b.firebaseapp.com",

  projectId: "elder-ease-1141b",

  storageBucket: "elder-ease-1141b.appspot.com",

  messagingSenderId: "879930004021",

  appId: "1:879930004021:web:eaa4f795b92306a786977c",

  measurementId: "G-J0W0VBXWZM"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {app, auth}