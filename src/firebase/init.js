import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAc0Dlkp655VPWlA9N0xOzUIBKrv-OGKro",
  authDomain: "fit5032-peeradon-assignment1.firebaseapp.com",
  projectId: "fit5032-peeradon-assignment1",
  storageBucket: "fit5032-peeradon-assignment1.firebasestorage.app",
  messagingSenderId: "436193051674",
  appId: "1:436193051674:web:dcd1da5040a99a9c77fda3",
  measurementId: "G-W7J6K8F74N"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// init firestore service.
const db = getFirestore();
export default db;