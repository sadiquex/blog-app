import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

export default function Home() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  // check for logged in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        navigate("/blogs");
      }
    });
    return unsubscribe;
  }, []);

  return (
    <div className="flex h-screen flex-col font-inter">
      <Navbar />
      <div className="container flex flex-1 flex-col items-center justify-center gap-8 sm:items-start">
        {/* left side */}
        <h1 className="text-center font-bricolage text-6xl font-bold leading-[72px] text-black/80 sm:text-left sm:text-[100px] sm:font-normal">
          Human <br /> stories & ideas
        </h1>
        <p className="text-center sm:text-left">
          A place to read, write, and deepen your understanding
        </p>
        <Link
          to={user ? "/blogs" : "/login"}
          className="text-md rounded-full bg-black/80 px-12 py-3 font-bold text-white hover:bg-black"
        >
          Start reading
        </Link>
      </div>
      <div className="w-full border-t border-black">
        <div className="container flex justify-center py-4 font-bricolage text-sm font-bold text-black/80">
          &copy; Ibrahim Sadique 2024
        </div>
      </div>
    </div>
  );
}
