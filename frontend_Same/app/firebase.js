// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCm4TBmhby1o0OnYH_91d0i1pRC3SGN1ww",
  authDomain: "eldereaseyoga.firebaseapp.com",
  projectId: "eldereaseyoga",
  storageBucket: "eldereaseyoga.appspot.com",
  messagingSenderId: "786252871023",
  appId: "1:786252871023:web:df0b6d911295364d9be49a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
