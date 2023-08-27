import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAUQNh6Y7ZBsMKcQZPTZYSz9owPqeOCh9o",
    authDomain: "saki-c4720.firebaseapp.com",
    databaseURL: "https://saki-c4720-default-rtdb.firebaseio.com",
    projectId: "saki-c4720",
    storageBucket: "saki-c4720.appspot.com",
    messagingSenderId: "146429433884",
    appId: "1:146429433884:web:07019a7c125f92fec967d9"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db=getDatabase(app)

  export {db,auth}