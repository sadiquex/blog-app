import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";

const Signup = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleSignIn = async () => {
    const googleProvider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, googleProvider); // trigger google auth modal
      const user = result.user;
      console.log(user);

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignUpWithEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredential.user;
      console.log(user);

      // update user profile with the entered username
      await updateProfile(auth.currentUser!, {
        displayName: username,
      });

      navigate("/login");
      toast.success("Account successfully created");
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
    }
  };

  return (
    <section className="flex h-screen items-center justify-center bg-gray-100 p-4 font-inter sm:p-0">
      <div className="w-full space-y-4 rounded-md bg-white p-4 shadow-sm sm:w-[500px]">
        <h3 className="text-2xl font-semibold">Create a new account</h3>
        <button
          onClick={handleGoogleSignIn}
          className="flex w-full items-center justify-center gap-1 rounded-md border border-gray-200 bg-transparent p-2 text-[1rem] text-slate-700 hover:border-gray-400"
        >
          <FcGoogle size={20} />
          Google
        </button>

        <div className="flex items-center justify-center text-slate-700">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="px-2">or continue with</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <form className="space-y-4" onSubmit={handleSignUpWithEmail}>
          <div className="flex w-full gap-2 rounded-md border border-gray-200 p-2 text-slate-800">
            <FaRegUser size={20} />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Username"
              className="bg-transparent text-sm outline-none"
            />
          </div>

          <div className="flex w-full gap-2 rounded-md border border-gray-200 p-2 text-slate-800">
            <MdOutlineMailOutline size={20} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email address"
              className="bg-transparent text-sm outline-none"
            />
          </div>

          <div className="flex w-full gap-2 rounded-md border border-gray-200 p-2 text-slate-800">
            <MdOutlineMailOutline size={20} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              className="bg-transparent text-sm outline-none"
            />
          </div>

          <button
            type="submit"
            className="block w-full rounded-md bg-slate-800 p-2 font-semibold text-white hover:bg-slate-800/90"
          >
            Sign up
          </button>
        </form>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <NavLink to="/login" className={"text-blue-800 hover:underline"}>
            Login
          </NavLink>
        </p>
      </div>
    </section>
  );
};

export default Signup;
