import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {};
// Initialize Firebase

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export let analytics;

if (typeof firebase.analytics === "function") {
  analytics = firebase.analytics();
}
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
