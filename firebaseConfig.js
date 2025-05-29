import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDXFPf2KTUTvP6yip45w8Dbg5lSN638Zv0",
    authDomain: "maxtenis-495f5.firebaseapp.com",
    databaseURL: "https://maxtenis-495f5-default-rtdb.firebaseio.com",
    projectId: "maxtenis-495f5",
    storageBucket: "maxtenis-495f5.firebasestorage.app",
    messagingSenderId: "631367714164",
    appId: "1:631367714164:web:82ebd5e1258f109c3cd821"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); 