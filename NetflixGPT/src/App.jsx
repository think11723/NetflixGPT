import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Browse from "./components/Browse";
import Error from "./components/Error";

import { auth } from "./utils/firebase";
import { onAuthStateChanged } from "firebase/auth";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "./utils/userSlice";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          addUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoUrl:user.photoURL
          })
        );

        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="browse" element={<Browse />} />
      </Route>

      <Route path="*" element={<Error />} />
    </Routes>
  );
}