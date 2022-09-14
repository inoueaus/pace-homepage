// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHMYyRwQui69VWsN-yLCu-whMI7bWIcRE",
  authDomain: "pace-coffee.firebaseapp.com",
  databaseURL: "https://pace-coffee-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pace-coffee",
  storageBucket: "pace-coffee.appspot.com",
  messagingSenderId: "339852200267",
  appId: "1:339852200267:web:dbfdff9845c75a8bef40ce",
  measurementId: "G-6JLMLP5W14"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//export const analytics = getAnalytics(app);
