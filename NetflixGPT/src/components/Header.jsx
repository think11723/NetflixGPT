import { signOut } from "firebase/auth";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch(() => {
        navigate('/Error');
      });
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent px-4 py-3 sm:px-6 md:px-8 lg:px-12 backdrop-blur-sm transition-all duration-300">
        <img
          src="https://occ.a.nflxso.net/dnmt/api/v6/iL4oJVDYZ8KLSrJ6eG2OwtghbfQ/AAAAAeuLioOK1ZSC8bQbffYbz1gZFxugAQdkx7UsMvqKDtFJLk3EWkpY-w8IBimYy_0xmg1aTzugh7JDHsGzv6hqIL9_qklFo-PFSH81MwCe9rokU4kGkdki.svg"
          className="h-8 sm:h-10 md:h-12 w-auto transition-transform duration-200 hover:opacity-80"
          alt="Netflix"
        />
        {user && (
          <button
            className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base font-semibold transition-all duration-200 transform hover:scale-105"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        )}
      </div>
    </>
  );
}

export default Header;
