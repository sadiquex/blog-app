import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import AllBlogs from "./pages/AllBlogs";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";
import BlogDetails from "./pages/BlogDetails";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

export default function App() {
  return (
    <div className="min-h-dvh bg-[#f5f6fa]">
      <Toaster />

      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/blogs" element={<AllBlogs />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/createblog" element={<CreateBlog />} />
        </Route>
      </Routes>
    </div>
  );
}
