// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCm46l4B2Grv-9Sy6tT6qvCeIExhDA4Y1U",
  authDomain: "bidland-bfee5.firebaseapp.com",
  projectId: "bidland-bfee5",
  storageBucket: "bidland-bfee5.appspot.com",
  messagingSenderId: "902767822690",
  appId: "1:902767822690:web:7d348a2baf7f37701e4e3b",
  measurementId: "G-VE8GNS03XE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export default storage