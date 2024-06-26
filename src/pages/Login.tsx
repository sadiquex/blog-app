import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaLock } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    const googleProvider = new GoogleAuthProvider();

    try {
      setIsLoading(true);
      const result = await signInWithPopup(auth, googleProvider); // trigger google auth modal
      const user = result.user;
      console.log(user);

      navigate("/blogs");
    } catch (error) {
      console.log(error);
      toast.error("Error signing in with Google");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginWithEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Successfully logged in");
      navigate("/blogs");
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Error logging in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex h-screen items-center justify-center bg-gray-100 p-4 font-inter sm:p-0">
      <div className="w-full space-y-4 rounded-md bg-white p-4 shadow-sm sm:w-[500px]">
        <h3 className="text-2xl font-semibold">Login to your account</h3>
        <button
          onClick={handleGoogleSignIn}
          className={`flex w-full items-center justify-center gap-1 rounded-md border border-gray-200 bg-transparent p-2 text-[1rem] text-slate-700 hover:border-gray-400 ${
            isLoading ? "cursor-not-allowed bg-gray-400" : ""
          }`}
          disabled={isLoading}
        >
          <FcGoogle size={20} />
          {isLoading ? "Signing in..." : "Google"}
        </button>

        <div className="flex items-center justify-center text-slate-700">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="px-2">or continue with</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <form className="space-y-4" onSubmit={handleLoginWithEmail}>
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
            <FaLock size={20} />
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
            className={`block w-full rounded-md p-2 font-semibold text-white ${
              isLoading
                ? "cursor-not-allowed bg-gray-400"
                : "bg-slate-800 hover:bg-slate-800/90"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="text-center text-sm">
          Don't have an account?{" "}
          <NavLink to="/signup" className={"text-blue-800 hover:underline"}>
            Sign up
          </NavLink>
        </p>
      </div>
    </section>
  );
};

export default Login;
