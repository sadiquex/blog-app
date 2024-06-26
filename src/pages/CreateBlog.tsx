import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, storage } from "../firebase";
import { toast } from "sonner";

export default function CreateBlog() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  // const [image, setImage] = useState(null);
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [user] = useAuthState(auth);
  const blogsCollectionRef = collection(db, "blogs");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleCreateBlog = async () => {
    if (!title || !blogContent || !image) {
      toast.error("All fields are required");
      return;
    }

    setIsLoading(true);
    let imageUrl = "";

    try {
      if (image) {
        const imageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      await addDoc(blogsCollectionRef, {
        title,
        blogContent,
        author: { name: user?.displayName, id: user?.uid },
        imageUrl,
        createdAt: serverTimestamp(),
      });

      navigate("/blogs");
    } catch (error) {
      console.error("Error creating blog:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center bg-gray-100 p-8 font-inter">
      <h1 className="mb-6 text-3xl font-semibold">Create Blog</h1>
      <div className="w-full max-w-lg space-y-4 rounded-md bg-white p-6 shadow-md">
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700">Title:</label>
          <input
            type="text"
            placeholder="Title..."
            className="rounded-md border p-2 outline-none"
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700">Post:</label>
          <textarea
            placeholder="Post..."
            className="rounded-md border p-2 outline-none"
            onChange={(event) => setBlogContent(event.target.value)}
            rows={5}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700">Image:</label>
          <input
            type="file"
            className="rounded-md border p-2 outline-none"
            onChange={handleImageChange}
          />
        </div>
        <button
          onClick={handleCreateBlog}
          disabled={isLoading}
          className={`mt-4 w-full rounded-md py-2 text-white ${
            isLoading
              ? "cursor-not-allowed bg-gray-400"
              : "bg-black/80 font-bold hover:bg-black"
          }`}
        >
          {isLoading ? "Adding..." : "Add Blog"}
        </button>
      </div>
    </div>
  );
}
