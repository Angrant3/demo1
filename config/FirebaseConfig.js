// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRS_DzOIFBsPvFjhM-BMmQrRNmJLYJCdA",
  authDomain: "frdata-4c855.firebaseapp.com",
  databaseURL: "https://frdata-4c855-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "frdata-4c855",
  storageBucket: "frdata-4c855.firebasestorage.app",
  messagingSenderId: "546441734556",
  appId: "1:546441734556:web:6d6bd2d284310824698059",
  measurementId: "G-KTVNPBSP6X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
//const analytics = getAnalytics(app);