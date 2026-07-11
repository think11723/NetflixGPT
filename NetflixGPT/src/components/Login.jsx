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
              navigate(<Error />)
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
        className="absolute text-white bg-black opacity-85 my-20 mx-110 p-5 w-100 rounded-2xl z-30"
      >
        <h1 className="font-bold text-3xl text-center m-2">
          {isNewUser ? "Sign Up" : "Sign In"}
        </h1>

        {error && <p className="font-bold text-red-600 mb-2">{error}</p>}

        {isNewUser && (
          <input
            type="text"
            ref={nameRef}
            placeholder="Name"
            className="w-full bg-gray-800 rounded-sm p-3 text-xl my-2"
          />
        )}

        <input
          ref={emailRef}
          type="email"
          placeholder="abc@gmail.com"
          className="w-full bg-gray-800 rounded-sm p-3 text-xl my-2"
        />

        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className="w-full bg-gray-800 rounded-sm p-3 text-xl my-2"
        />

        <button
          type="submit"
          className="w-full bg-red-800 rounded-sm p-2 text-2xl font-extrabold my-5 hover:bg-red-950"
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
