// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKvpmu_Foe7IpyqyMLL2eG6-aAdfP8UPA",
  authDomain: "devatlas-d4b94.firebaseapp.com",
  projectId: "devatlas-d4b94",
  storageBucket: "devatlas-d4b94.firebasestorage.app",
  messagingSenderId: "269079318149",
  appId: "1:269079318149:web:274703677324321d9723ec",
  measurementId: "G-1NDB31FSY4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();