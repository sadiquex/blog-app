import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { FaRegUserCircle } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { toast } from "sonner";
import { MdLogout } from "react-icons/md";

export default function Navbar() {
  const [user] = useAuthState(auth);
  const userName = user?.displayName || user?.email;

  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      localStorage.removeItem("isAuth");
      await signOut(auth);
      navigate("/");
      toast.success("Sign out success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="w-full border-b border-black">
      <div className="container flex flex-wrap justify-between gap-4 px-4 py-8 sm:flex-row sm:gap-0 sm:px-0">
        {/* logo */}
        <h2 className="w-full cursor-pointer whitespace-nowrap text-center font-bricolage text-xl font-bold uppercase sm:w-auto sm:text-left sm:text-2xl">
          Sadique Blog
        </h2>
        {/* dynamically display the user name if there's one (if they're logged in) */}

        {user ? (
          <div className="flex items-center gap-2 font-inter">
            <Link
              to={"/createblog"}
              className="rounded-md bg-black/90 px-4 py-2 text-white"
            >
              + New Blog
            </Link>

            <FaRegUserCircle size={24} />
            {userName}

            <button onClick={handleSignOut} className="cursor-pointer">
              <MdLogout size={24} />
            </button>
          </div>
        ) : (
          <ul className="flex w-full flex-row items-center justify-center gap-4 sm:w-auto">
            <li>
              <Link
                to={"/login"}
                className="whitespace-nowrap rounded-lg bg-black/80 px-6 py-3 text-white hover:bg-black"
              >
                Get Started
              </Link>
            </li>
            <li>
              <Link
                to={"/signup"}
                className="whitespace-nowrap rounded-lg border border-black/80 px-6 py-3 hover:bg-black/80 hover:text-white"
              >
                Sign Up
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
