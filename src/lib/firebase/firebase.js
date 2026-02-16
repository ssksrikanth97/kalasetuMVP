
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
  apiKey: "AIzaSyD0lZoJbW3DGw03Sk-x0PnSMQoCSVfp1lo",
  authDomain: "kalasetu-220ce.firebaseapp.com",
  databaseURL: "https://kalasetu-220ce-default-rtdb.firebaseio.com",
  projectId: "kalasetu-220ce",
  storageBucket: "kalasetu-220ce.firebasestorage.app",
  messagingSenderId: "229598710851",
  appId: "1:229598710851:web:03fd5d896ec83c6d8118f6",
  measurementId: "G-MVVWDN1KN8"
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
