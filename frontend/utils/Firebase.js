import {getAuth, GoogleAuthProvider } from "firebase/auth"
import { initializeApp} from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginluxycart.firebaseapp.com",
  projectId: "loginluxycart",
  storageBucket: "loginluxycart.firebasestorage.app",
  messagingSenderId: "225025767475",
  appId: "1:225025767475:web:309aa359aecaadc2500b46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth, provider}
