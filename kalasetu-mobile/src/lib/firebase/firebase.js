import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDg-5-Fj-GzBM1p4AImS_sFOPYOhQu1GrU",
    authDomain: "kalasetu-23a34.firebaseapp.com",
    databaseURL: "https://kalasetu-23a34-default-rtdb.firebaseio.com",
    projectId: "kalasetu-23a34",
    storageBucket: "kalasetu-23a34.firebasestorage.app",
    messagingSenderId: "901204924996",
    appId: "1:901204924996:web:baa485bf4fc8167cf1ba11",
    measurementId: "G-YYER50JG0X"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage, firebaseConfig };
