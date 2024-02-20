import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  auth,
  createUserWithEmailAndPassword,
  db,
  setDoc,
  doc,
} from "../firebase/firebaseInit";
import "../login/TrysignUp.css";
import { userAuthContext } from "../firebase/userAuthContext";

function Try() {
  const router = useRouter();
  const [Surname, setSurname] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const SubmitForm = async (e) => {
    e.preventDefault();
    if (Password !== ConfirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        Email,
        Password,
        Surname
      );
      const user = userCredential.user;
      const userData = {
        Email: Email,
        Password: Password,
        Surname: Surname,
        role: "user",
      };
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, userData);
      router.push("signin");
    } catch (error) {
      setError("Email is already in use");
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="main-con">
      <div className="form-container">
        <div >
          <h2>Sign up</h2>
       
          <form onSubmit={SubmitForm}  class="UP">
            <label htmlFor="surname">Surname:</label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={Surname}
              onChange={(e) => setSurname(e.target.value)}
              placeholder="Surname"
            />

            <label htmlFor="email">
              <p>Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                value={Email}
                id="email"
                placeholder="example@mail.com"
              />
            </label>
            <label htmlFor="password">
              <p>Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                value={Password}
                id="password"
                placeholder="Create password"
              />
            </label>
            <label htmlFor="confirm-password">
              <p>Confirm Password</p>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                type="password"
                value={ConfirmPassword}
                id="confirm-password"
                placeholder="Confirm password"
              />
            </label>
            {error && <p className="error-message">{error}</p>}
            <div className="custom">
              <button type="submit" className="custom-button">
                Sign Up
              </button>
              <div className="link">
                <p>Already have an account?</p>
                <Link href="signin">Login</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
   </div>
  );
}

export default Try;
