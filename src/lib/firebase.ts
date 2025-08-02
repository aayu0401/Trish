
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA_bP-0DxssNAEEqu-WKXzLKAUucTTr_4o",
  authDomain: "trish-j5ujv.firebaseapp.com",
  projectId: "trish-j5ujv",
  storageBucket: "trish-j5ujv.appspot.com",
  messagingSenderId: "25505163931",
  appId: "1:25505163931:web:5b61e1ce34cc13117e343e"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
