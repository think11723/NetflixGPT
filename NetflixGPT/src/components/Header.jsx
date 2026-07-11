import { signOut } from "firebase/auth";
import React, { use } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";

const Header = () => {
  const navigate = useNavigate()
  const user = useSelector((state)=>state.user)
  console.log(user);
  function handleSignOut() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate('/')
      })
      .catch((error) => {
        // An error happened.
        navigate('/Error')
      });
  }

  return (
    <>
    <div className="absolute flex justify-between p-2 items-center w-screen">

      <img
        src="https://occ.a.nflxso.net/dnmt/api/v6/iL4oJVDYZ8KLSrJ6eG2OwtghbfQ/AAAAAeuLioOK1ZSC8bQbffYbz1gZFxugAQdkx7UsMvqKDtFJLk3EWkpY-w8IBimYy_0xmg1aTzugh7JDHsGzv6hqIL9_qklFo-PFSH81MwCe9rokU4kGkdki.svg"
        className=" my-2 mx-8 h-12 bg-linear-to-b from-black z-10"
      />
      
      {user && <button
        className="bg-red-600 font-bold w-20 h-10 mr-2 rounded-md cursor-pointer hover:bg-red-600 z-10"
        onClick={handleSignOut}
      >
        Sign Out
      </button>}
    </div>
  {!user && <div className="bg-black z-9 font-extrabold w-full h-full text-white absolute opacity-60">
        
    </div>}
    </>
  );
};

export default Header;
