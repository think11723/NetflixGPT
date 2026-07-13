import React, { useRef, useState } from "react";
import Header from "./Header";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { validateEmailandPassword } from "../utils/validate";
import { auth } from "../utils/firebase";
import { addUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Error from "./Error";

const Login = () => {
  const [isNewUser, setIsNewUser] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);

  const handleToggle = () => {
    setIsNewUser((prev) => !prev);
    setError(null);
  };

  const handleSubmit = () => {
    setError(null);
    let user;
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;

    const message = validateEmailandPassword(email, password);

    if (message) {
      setError(message);
      return;
    }

    if (isNewUser) {
      // Sign Up
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("user created :"+ email);
          user = userCredential.user;
          updateProfile(user, {
            email: user.email,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              // Profile updated!
              // ...
              const user = auth.currentUser;
              dispatch(
                addUser({
                  uid: user.uid,
                  email: user.email,
                  displayName: user.displayName,
                  photoUrl: user.photoURL,
                }),
              );
              navigate("/browse");

              
            })
            .catch((error) => {
              // An error occurred
              // ...
            });
          // console.log(userCredential.user);
        })
        .catch((error) => {
          setError(`${error.code} - ${error.message}`);
        });
    } else {
      // Sign In
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          user = userCredential.user;
          console.log("User logged in");
          // console.log(userCredential.user);
        })
        .catch((error) => {
          setError(`${error.code} - ${error.message}`);
        });
        navigate("/browse");
    }

  };

  return (
    <div>
      <img
        src="https://i.pinimg.com/originals/19/8b/2f/198b2f01e73b905772279616eccc7c65.jpg?nii=t"
        alt="Background"
        className="absolute w-full h-full object-cover"
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="absolute left-1/2 top-1/2 z-30 w-11/12 max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-black p-6 text-white opacity-90 sm:w-96 sm:p-8 md:w-full md:max-w-sm"
      >
        <h1 className="mb-4 text-center text-2xl font-bold sm:text-3xl">
          {isNewUser ? "Sign Up" : "Sign In"}
        </h1>

        {error && <p className="mb-3 font-bold text-red-500 text-sm sm:text-base">{error}</p>}

        {isNewUser && (
          <input
            type="text"
            ref={nameRef}
            placeholder="Name"
            className="mb-3 w-full rounded-sm bg-gray-800 p-2.5 text-base text-white placeholder-gray-400 sm:p-3 sm:text-lg"
          />
        )}

        <input
          ref={emailRef}
          type="email"
          placeholder="abc@gmail.com"
          className="mb-3 w-full rounded-sm bg-gray-800 p-2.5 text-base text-white placeholder-gray-400 sm:p-3 sm:text-lg"
        />

        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className="mb-4 w-full rounded-sm bg-gray-800 p-2.5 text-base text-white placeholder-gray-400 sm:p-3 sm:text-lg"
        />

        <button
          type="submit"
          className="w-full rounded-sm bg-red-700 p-2.5 text-lg font-bold text-white transition hover:bg-red-800 sm:p-3 sm:text-xl"
        >
          {isNewUser ? "Sign Up" : "Sign In"}
        </button>

        <p
          onClick={handleToggle}
          className="cursor-pointer font-bold underline mb-2"
        >
          {isNewUser
            ? "Already Registered? Sign In Now"
            : "New User? Sign Up Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
