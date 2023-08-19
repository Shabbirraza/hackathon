import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyC-Nxl_6vmFf4yZk2dQh2CAJ2SxPj0ceoI",
    authDomain: "hackathon-aca44.firebaseapp.com",
    projectId: "hackathon-aca44",
    storageBucket: "hackathon-aca44.appspot.com",
    messagingSenderId: "288339884485",
    appId: "1:288339884485:web:bd49b6d5509a80b492b3ac"
  };
  

export  const app = initializeApp(firebaseConfig);
export  const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);