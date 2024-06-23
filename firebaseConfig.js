// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMCwiUcHW4gfCF2xAIB6kAgqrVV2HOmbo",
  authDomain: "band-game-b1366.firebaseapp.com",
  projectId: "band-game-b1366",
  storageBucket: "band-game-b1366.appspot.com",
  messagingSenderId: "342408314830",
  appId: "1:342408314830:web:81805d99cb4ca280b1759f",
  measurementId: "G-K9S7LK4RD9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth(app);
const firestore = getFirestore(app);

export { firestore };