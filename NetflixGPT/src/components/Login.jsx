import React, { useRef, useState } from "react";
import Header from "./Header";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { validateEmailandPassword } from "../utils/validate";
import { auth } from "../utils/firebase";

const Login = () => {
  const [isNewUser, setisNewUser] = useState(true);
  const [Error, setError] = useState(null);
  let email = useRef("");
  let password = useRef("");
  function handleToggle() {
    setisNewUser(!isNewUser);
  }

  let message = null;
  function handleSubmit() {
    setError(null);
    email = email?.current?.value;
    password = password?.current?.value;
    //    password = current.value
    console.log(email, password);
    message = validateEmailandPassword(email, password);
    console.log(message);
    if (message !== null) {
      setError(message);
      return;
    } else {
      if (isNewUser) {
        // sign up logic
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log("new user created ");
            console.log(user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorCode + "-" + errorMessage);
          });
      } else {
        // sign in logic
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("user logged in");
            console.log(user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorCode + "-" + errorMessage);
          });
      }
    }
  }
  return (
    <div>
      <Header />
      <img
        src="https://i.pinimg.com/originals/19/8b/2f/198b2f01e73b905772279616eccc7c65.jpg?nii=t"
        alt="bg-image"
        className="absolute w-full h-full"
      />

      <form
        action=""
        className="absolute text-white bg-black opacity-85 my-20 mx-110 p-5 w-100  rounded-2xl"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h1 className="font-bold text-3xl text-center m-2">
          {isNewUser ? "Sign Up" : "Sign In"}
        </h1>
        {Error && <p className="font-bold text-red-800">{Error}</p>}
        {isNewUser && (
          <input
            type="text"
            name="Name"
            id=""
            placeholder="Name"
            className="w-full bg-gray-800 rounded-sm p-3 text-xl my-2"
          />
        )}
        <input
          ref={email}
          name="email"
          id=""
          placeholder="abc@gmail.com"
          className="w-full bg-gray-800 rounded-sm p-3 text-xl my-2"
        />
        <input
          type="password"
          ref={password}
          name=""
          id=""
          placeholder="password"
          className="w-full bg-gray-800 rounded-sm p-3 text-xl my-2"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-red-800 rounded-sm p-2 text-2xl font-extrabold my-5 items-center hover:bg-red-950"
        >
          {isNewUser ? "Sign Up" : "Sign In"}
        </button>
        <p
          className="cursor-pointer font-bold underline mb-2"
          onClick={handleToggle}
        >
          {isNewUser
            ? "Already Registered? Sign In Now"
            : "New User ? Sign Up Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
