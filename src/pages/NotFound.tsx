import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <h2 className="text-md cursor-pointer whitespace-nowrap text-center font-bricolage font-bold uppercase text-slate-800 sm:text-left sm:text-2xl">
        Sadique Blog
      </h2>

      <h1 className="font-bricolage text-4xl font-bold text-gray-800">
        404 - Page Not Found
      </h1>
      <p className="mt-2 text-gray-600">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-4 rounded-md bg-slate-800 px-4 py-2 font-inter text-white hover:underline"
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
