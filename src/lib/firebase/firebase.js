
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  initializeFirestore,
  enableIndexedDbPersistence,
  persistentLocalCache,
  persistentMultipleTabManager
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

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

// Initialize Firestore with persistence
const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
});

const storage = getStorage(app);

let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, auth, db, storage, analytics };
