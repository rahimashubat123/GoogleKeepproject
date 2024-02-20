
import React, { useEffect, useState, useContext, createContext } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { db } from "../firebase/firebaseInit";
import { collection, addDoc } from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, query, onSnapshot } from "../firebase/firebaseInit";
import { where } from "firebase/firestore";
//import { onAuthStateChanged } from "firebase/auth";

export const UserContext = createContext();

const UserAuthContext = ({ children }) => {
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [surname, setSurname] = useState(""); // Add state for surname
  const [getNotes, setNotes] = useState([]); // State for notes data
  const [user, setUser] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        // Fetch the surname when the currentUser changes
        const userId = user.uid;
        console.log("user", userId);
        const userDocRef = doc(db, "users", userId); // Update this based on your Firestore structure
        getDoc(userDocRef)
          .then((doc) => {
            if (doc.exists()) {
              const userData = doc.data();
              setSurname(userData.Surname);
              console.log("Surname value in UserAuthContext:", userData);
            } else {
              console.log("User document not found in Firestore.");
            }
          })
          .catch((error) => {
            console.error("Error getting user data:", error);
          });
      } else {
        setCurrentUser(null);
      }
    });

    return unsubscribe; // Cleanup the listener when the component unmounts
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.role, user.email);
        onSnapshot(doc(db, "users", user.uid), (doc) => {
          if (doc.exists) {
            const data = { ...doc.data(), userId: user.uid };

            setUser(data);
          }
        });
      } else {
        console.log("user logout...");
      }
    });
  }, []);

  // console.log(currentUser);

  useEffect(() => {
    if (user) {
      if (user.role === "superuser") {
        console.log(user);
        console.log("Fetching notes for superuser...", user.role);
        const q = query(collection(db, "notes"));

        onSnapshot(q, (querySnapshot) => {
          const notesData = [];
          querySnapshot.forEach((doc) => {
            notesData.push({ ...doc.data(), id: doc.id });
          });
          setNotes(notesData);
        });
      } else {
        console.log("Fetching notes for regular user...");
        const q = query(
          collection(db, "notes"),
          where("ownerId", "==", user.userId)
        );

        onSnapshot(q, (querySnapshot) => {
          const notesData = [];
          querySnapshot.forEach((doc) => {
            notesData.push({ ...doc.data(), id: doc.id });
          });
          setNotes(notesData);
        });
      }
    }
  }, [user]);

  

  const signUp = async (email, password, FullName) => {
    setError("");
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const docRef = await addDoc(collection(db, "users"), {
        FullName,
        userId: result.user.uid,
        // surname: "Your Surname", // Add the user's surname here
        surname: " Surname",
      });

      alert("Welcome! New user created successfully");
      console.log("Document written with ID", docRef.id);
    } catch (e) {
      if (e.code === "auth/email-already-in-use") {
        setError("Email already in use. Try another email.");
      } else if (e.code === "auth/weak-password") {
        setError("Password must be at least 6 characters long.");
      } else {
        setError(e.message);
      }
    }
  };

  const value = {
    signUp,
    error,
    currentUser,
    surname, // Include the surname in the context
  };

  return (
    <UserContext.Provider value={{ value, getNotes, surname }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserAuthContext;
