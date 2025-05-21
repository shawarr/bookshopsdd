// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

    apiKey: "AIzaSyBwMdKCc6JwbfVYJpWUSUYulhBd5kWgvQg",

    authDomain: "bookshopsdd.firebaseapp.com",

    projectId: "bookshopsdd",

    storageBucket: "bookshopsdd.firebasestorage.app",

    messagingSenderId: "452878394373",

    appId: "1:452878394373:web:1460b1cb6e5f150c63a86c"

};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
