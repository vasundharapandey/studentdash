
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA1iBwhdYKLBHm4BczQcJH_CYzDdy4miF0",
  authDomain: "studentdash-29d66.firebaseapp.com",
  projectId: "studentdash-29d66",
  storageBucket: "studentdash-29d66.appspot.com",
  messagingSenderId: "443502152640",
  appId: "1:443502152640:web:ce3e11a96484c6b4561625",
  measurementId: "G-7QVQLQVXZQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };