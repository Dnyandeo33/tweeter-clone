// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCqPPB8Mr2hfqUd0oGjJZaCbWEnSHRoqeA",
    authDomain: "twitter-clone-f1303.firebaseapp.com",
    projectId: "twitter-clone-f1303",
    storageBucket: "twitter-clone-f1303.appspot.com",
    messagingSenderId: "313850114335",
    appId: "1:313850114335:web:76f15aa44d3cab97c9402a"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp;
const db = getFirestore();
const storage = getStorage();

export default app;
export {db, storage};