// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHMYyRwQui69VWsN-yLCu-whMI7bWIcRE",
  authDomain: "pace-coffee.firebaseapp.com",
  projectId: "pace-coffee",
  storageBucket: "pace-coffee.appspot.com",
  messagingSenderId: "339852200267",
  appId: "1:339852200267:web:dbfdff9845c75a8bef40ce",
  measurementId: "G-6JLMLP5W14",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);

// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.
const appCheck = initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaV3Provider("6LeQYZcgAAAAAIfC-VUXxtTbusQsNpqJuPtS92S9"),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true,
});
