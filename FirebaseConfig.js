// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWOT22kx1PWExB9SWf81ZaPAozhjudaVA",
  authDomain: "webportapetbeta.firebaseapp.com",
  projectId: "webportapetbeta",
  storageBucket: "webportapetbeta.appspot.com",
  messagingSenderId: "411434491747",
  appId: "1:411434491747:web:2abd3b468cccdaf7ac3d56"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig); 
export const db = getFirestore(app); 
export const storage = getStorage(app);