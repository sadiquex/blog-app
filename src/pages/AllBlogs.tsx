import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import {
  Timestamp,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { formatCreatedAt } from "../lib/utils";

interface Author {
  id: string;
  name: string;
}

// structure of each blog
interface Blog {
  id: string;
  title: string;
  blogContent: string;
  imageUrl: string;
  createdAt: Timestamp;
  author: Author;
}

export default function AllBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);

  // from the db, get 'blogs' collection
  const blogsCollectionRef = collection(db, "blogs");

  const fetchBlogs = async () => {
    // sort the blogs by most recent
    const blogsQuery = query(blogsCollectionRef, orderBy("createdAt", "desc"));

    try {
      setLoading(true);
      // onSnapshot for real-time updates
      onSnapshot(blogsQuery, (querySnapshot) => {
        const blogsList = querySnapshot.docs?.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Blog[];
        setBlogs(blogsList);
        setLoading(false);
      });
    } catch (error) {
      toast.error("Error fetching blogs");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <main>
      <Navbar />
      <Hero />
      {/* output the content */}
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className="container grid grid-cols-1 gap-4 px-4 py-4 sm:grid-cols-3 sm:px-0">
          {blogs?.map((blog, i) => (
            <Link
              key={i}
              to={`/blogs/${blog.id}`}
              className="h-[400px] overflow-hidden rounded-xl bg-white shadow-sm"
            >
              {/* image */}
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="h-[200px] w-full rounded-xl object-cover transition-transform duration-700 ease-in-out hover:scale-105"
              />
              {/* category and date */}
              <div className="flex items-center justify-between gap-4 p-2 font-inter text-xs">
                <span className="rounded-full bg-gray-200 p-2 text-slate-600">
                  {blog?.author.name}
                </span>
                <hr className="flex-grow border-t border-gray-800" />

                <p>{formatCreatedAt(blog.createdAt)}</p>
              </div>

              {/* desc */}
              <h3 className="p-2 font-bricolage text-2xl font-semibold hover:underline">
                {blog.title}
              </h3>
              <p className="truncate p-2 font-inter text-gray-600">
                {blog.blogContent}
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
