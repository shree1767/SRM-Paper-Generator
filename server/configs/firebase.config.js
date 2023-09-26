const { initializeApp } = require("firebase/app");

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: "paper-generator-f0cb6",
  storageBucket: "gs://paper-generator-f0cb6.appspot.com",
  messagingSenderId: "168508633258",
  appId: process.env.FIREBASE_APP_ID,
  // measurementId: "G-1S1WFJJQZR",
};

let firebaseApp;

const initializeFirebase = () => {
  firebaseApp = initializeApp(firebaseConfig);

  console.log("Firebase Ready");
};

module.exports = { initializeFirebase, firebaseApp };
