// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
import firebase from "firebase/compat/app";
//  import "firebase/compat/auth";
//  import "firebase/compat/firestore";
// import "firebase/compat/firestore";
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import "./Login.css";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((usercredential) => {
        if (usercredential) navigate("/");
      })
      .catch((error) => alert(error.message));
  };
  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((usercredential) => {
        if (usercredential) navigate("/");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://www.versionmuseum.com/images/websites/amazon-website/amazon-website%5E2000%5Eamazon-logo-900.png"
        />
      </Link>
      <div className="login_container">
        <h1>Sign In</h1>
        <form>
          <h5>Email</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" onClick={signIn} className="login_signinButton">
            Sign In
          </button>
        </form>
        <p>
          By signing in you are agree to the Amazone page Clone condition of the
          sale. Please see our privacy notice. our cookies notice and our
          interst-based ads Notice
        </p>
        <button
          type="submit"
          onClick={register}
          className="login_registterButton"
        >
          Create Your Amazon Account
        </button>
      </div>
    </div>
  );
};

export default Login;
