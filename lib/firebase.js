
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAD4sW6tVOJ6fcfnZnVFNbda7J3gEE15xQ",
    authDomain: "amerox-airdrop.firebaseapp.com",
    projectId: "amerox-airdrop",
    storageBucket: "amerox-airdrop.firebasestorage.app",
    messagingSenderId: "778318735939",
    appId: "1:778318735939:web:b7a94660b95ebddc2742f6",
    measurementId: "G-4DCXQ2VK2F"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
