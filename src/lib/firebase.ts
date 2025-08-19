import { initializeApp, getApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type Storage } from 'firebase/storage';
import { getFirebaseConfig } from '@/app/actions';

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: Storage;

async function initializeFirebase() {
  if (getApps().length === 0) {
    const config = await getFirebaseConfig();
    if (!config) {
      throw new Error('Firebase config not found');
    }
    app = initializeApp(config);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
  } else {
    app = getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
  }
  return { app, auth, db, storage };
}

export { initializeFirebase };
