import React, { useState } from "react";
import { useRouter } from "next/router";
import SignIn from "../../app/login/log/signIn";
import style from "../../app/login/Login.css";
import { auth, signInWithEmailAndPassword } from "../firebase/firebaseInit";

const Login = () => {
  const [Surname , setSurname] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const router = useRouter();

  const SubmitForm = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        Email,
        Password,
        Surname
       
      );
      const user = userCredential.user;
      console.log("User registered:", user);
      alert("User Login Successfully");
      router.push("/");
    } catch (error) {
      alert("invalid email or password");
      console.error("Error creating user:", error);
    }
  };

  return (
    <div>
      <div className="main-con">
        <div className="form-contain" id="model-login">
          <div class="RRR">
            <h2>Login</h2>
            </div>
            <form onSubmit={SubmitForm} class="IN">
          
             
             <label htmlFor="surname">Surname:</label>
        < input
          type="text"
          id="surname"
          name="surname"
          value={Surname}
          onChange={(e) => setSurname(e.target.value)}
          placeholder="surname"
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

              <div className="custom">
                <button className="custom-button" type="submit">
                  Login
                </button>
                <div className="lin">
                  <p> back to signup</p>
                  <a href={"signup"} title="click">
                    signup
                  </a>
                  {/* <div>
                    <a href="/"> home</a>
                  </div> */}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
   
  );
};

export default Login;
