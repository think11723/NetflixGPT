import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
    const [isNewUser,setisNewUser] = useState(true)
    function handleToggle(){
         setisNewUser(!isNewUser);
    }
  return <div >
    <Header />
    <img src="https://i.pinimg.com/originals/19/8b/2f/198b2f01e73b905772279616eccc7c65.jpg?nii=t" alt="bg-image" className="absolute"/>

    <form action="" className="absolute text-white bg-black opacity-80 my-40 mx-130 p-5 w-130  rounded-2xl">
        <h1 className="font-bold text-3xl text-center m-2">{ isNewUser? "Sign Up":"Sign In" }</h1>
        {isNewUser && <input type="text" name="Name" id="" placeholder="Name" className="w-full bg-gray-800 rounded-sm p-3 text-xl my-2"/>}
        <input type="email" name="email" id="" placeholder="abc@gmail.com" className="w-full bg-gray-800 rounded-sm p-3 text-xl my-2"/>
        <input type="password" name="" id="" placeholder="password" className="w-full bg-gray-800 rounded-sm p-3 text-xl my-2"/>
        <button className="w-full bg-red-800 rounded-sm p-2 text-2xl font-extrabold my-5 items-center">{ isNewUser? "Sign Up":"Sign In" }</button>
        <p className="cursor-pointer font-bold underline mb-2" onClick={handleToggle}>{ isNewUser? "Already Registered? Sign In Now":"New User ? Sign Up Now" }</p>
    </form>
  </div>;
};

export default Login;
