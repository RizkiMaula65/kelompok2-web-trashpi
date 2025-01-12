// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "-",
  authDomain: "-",
  databaseURL: "https://trashpi-db-default-rtdb.firebaseio.com",
  projectId: "trashpi-db",
  storageBucket: "trashpi-db.appspot.com",
  messagingSenderId: "959598424897",
  appId: "1:959598424897:web:f8646ef4bd522b484f67c0",
  measurementId: "G-W95BE5CKBS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export { database }
