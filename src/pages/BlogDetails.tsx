import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  query,
  onSnapshot,
  addDoc,
  updateDoc,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { toast } from "sonner";
import { useAuthState } from "react-firebase-hooks/auth";

interface Author {
  id: string;
  name: string;
}

interface Blog {
  id: string;
  title: string;
  blogContent: string;
  imageUrl: string;
  createdAt: Timestamp;
  author: Author;
}

interface Comment {
  id: string;
  text: string;
  author: string;
  createdAt: Timestamp;
}

export default function BlogDetails() {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const [user] = useAuthState(auth);

  const fetchBlogDetails = async () => {
    if (id) {
      const blogDocRef = doc(db, "blogs", id);

      try {
        setLoading(true);
        const blogDoc = await getDoc(blogDocRef);

        if (blogDoc.exists()) {
          setBlog(blogDoc.data() as Blog);
          fetchComments(id);
        } else {
          toast.error("Blog not found");
        }
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching blog details");
        setLoading(false);
      }
    }
  };

  const fetchComments = (blogId: string) => {
    const commentsCollectionRef = collection(db, "blogs", blogId, "comments");
    const commentsQuery = query(
      commentsCollectionRef,
      orderBy("createdAt", "desc"),
    );

    onSnapshot(commentsQuery, (querySnapshot) => {
      const commentsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Comment[];
      setComments(commentsList);
    });
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const commentsCollectionRef = collection(db, "blogs", id!, "comments");
      await addDoc(commentsCollectionRef, {
        text: newComment,
        author: user?.displayName,
        createdAt: Timestamp.fromDate(new Date()),
      });
      setNewComment("");
      toast.success("Comment added");
    } catch (error) {
      toast.error("Error adding comment");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditTitle(blog?.title || "");
    setEditContent(blog?.blogContent || "");
  };

  const handleSaveEdit = async () => {
    if (id && blog) {
      const blogDocRef = doc(db, "blogs", id);

      try {
        await updateDoc(blogDocRef, {
          title: editTitle,
          blogContent: editContent,
        });
        toast.success("Blog updated successfully");
        setIsEditing(false);
        fetchBlogDetails();
      } catch (error) {
        toast.error("Error updating blog");
      }
    }
  };

  useEffect(() => {
    fetchBlogDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <div>No blog found</div>;
  }

  return (
    <div className="container flex flex-col items-center gap-8 px-4 py-8 font-inter sm:px-0">
      {isEditing ? (
        <>
          <h1 className="text-center font-bricolage text-4xl font-semibold">
            Edit Blog
          </h1>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full max-w-2xl rounded-md border p-2"
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full max-w-2xl rounded-md border p-2"
            rows={10}
          />
          <button
            onClick={handleSaveEdit}
            className="mt-2 rounded-md bg-slate-800 p-2 font-semibold text-white hover:bg-slate-800/90"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <h1 className="text-center font-bricolage text-4xl font-semibold">
            {blog.title}
          </h1>
          {user?.uid === blog.author.id && (
            <button
              onClick={handleEdit}
              className="mt-2 rounded-md bg-slate-800 p-2 font-semibold text-white hover:bg-slate-800/90"
            >
              Edit Blog
            </button>
          )}
          <div className="flex items-center gap-2">
            <div className="h-[70px] w-[70px] overflow-hidden rounded-full text-sm">
              <img src={"/assets/user.png"} alt={blog.author.name} />
            </div>
            <div className="flex flex-col">
              <p className="font-bold text-slate-800">By {blog.author.name}</p>
              <p className="text-sm text-slate-800">
                Updated on{" "}
                {new Date(blog.createdAt.seconds * 1000).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  },
                )}
              </p>
            </div>
          </div>
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="h-[65vh] w-full rounded-3xl object-cover"
          />
          <p className="text-md w-[60%] font-inter">{blog.blogContent}</p>
        </>
      )}

      {/* Comments Section */}
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-semibold">Comments</h2>
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-300 pb-2">
              <p className="font-bold">{comment.author}</p>
              <p>{comment.text}</p>
              <p className="text-sm text-gray-500">
                {new Date(comment.createdAt.seconds * 1000).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  },
                )}
              </p>
            </div>
          ))}
        </div>

        {/* Add Comment */}
        <div className="mt-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full rounded-md border border-gray-300 p-2"
            rows={4}
          />
          <button
            onClick={handleAddComment}
            className="mt-2 rounded-md bg-slate-800 p-2 font-semibold text-white hover:bg-slate-800/90"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
