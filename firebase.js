// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import { getFireStore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWWbCSXOZhb0Jg5HiZdkpDpg11s55eSBw",
  authDomain: "tinder-clone-cd3a1.firebaseapp.com",
  projectId: "tinder-clone-cd3a1",
  storageBucket: "tinder-clone-cd3a1.appspot.com",
  messagingSenderId: "345898666160",
  appId: "1:345898666160:web:46991fe47510d0ad515375",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
//const db = getFireStore();

export { auth };
