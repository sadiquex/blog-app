// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// REMEMBER TO PUT THESE VARIABLES IN AN ENV FILE
const firebaseConfig = {
  apiKey: "AIzaSyCzxEdiu0gwg7k1CywCpCDhx51mqcpdEc0",
  authDomain: "blog-app-5c626.firebaseapp.com",
  projectId: "blog-app-5c626",
  storageBucket: "blog-app-5c626.appspot.com",
  messagingSenderId: "417546379494",
  appId: "1:417546379494:web:9b5902f29a8148fe40db27",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;

// initialize database on the frontend
export const db = getFirestore(app);
export const storage = getStorage(app);
