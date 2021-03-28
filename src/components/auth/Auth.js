import React, { useContext, useEffect, useState } from "react";
import firebase from "./components/firebase";
import { handleSignup, handleSignin } from "./components/FirebaseFunctions"; //# firebase functions
import { Context } from "../Context";
export const Auth = () => {
  const { user, setUser } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [error, setError] = useState("");
  return (
    <div>
      <h1>login system</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (loggingIn === false) {
            handleSignup(email, password);
          } else {
            handleSignin(email, password);
            setUser(firebase.auth().currentUser);
          }
        }}
      >
        <label>
          Name: <br />
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </label>
        <br />
        <label>
          Password: <br />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </label>
        <br />
        {error !== "" ? <p className="err">{error}</p> : null}
        <input type="submit" value={loggingIn ? "Login" : "Signup"} />
        <p>
          {loggingIn ? "Don't have an account?" : "Already have an account?"}
          <span onClick={() => setLoggingIn(!loggingIn)}>
            {loggingIn ? " Create an account." : " Login."}
          </span>
        </p>
      </form>
      {user !== null ? (
        <h2>
          current user: email: {user.email}, uid: {user.uid}
        </h2>
      ) : null}
    </div>
  );
};
