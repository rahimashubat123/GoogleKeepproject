import { initializeApp } from "firebase/app";

import { firebaseConfig } from "./firebaseConfig";


import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  query,
  onSnapshot,
  getDoc,
  deleteDoc,
  signOut,
} from "firebase/firestore";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";




// var admin = require("firebase-admin");







const App = initializeApp(firebaseConfig);

const auth = getAuth(App);

const db = getFirestore(App);

const userId = "someUserID";

// const admin = require('firebase-admin');
// if (typeof window === 'undefined') {
//   const fs = require('fs');
// }






export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  collection,
  addDoc,
  db,
  setDoc,
  doc,
  onSnapshot,
  query,
  getDoc,
  deleteDoc,
  signOut,
}
