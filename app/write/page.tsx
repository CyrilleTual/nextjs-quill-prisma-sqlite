// pages/write.tsx

"use client";
import "./style.css";
import { useState } from "react";
import { Post } from "@prisma/client";
import ImageUploader from "@/components/imageUploader";
import Editor from "@/components/editor";

export default function Write() {
  const [post, setPost] = useState<Partial<Post>>({ title: "", content: "" });

  //  fonction pour sauvegarder le post
  const savePost = async () => {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

    if (response.ok) {
      console.log("Post saved");
    } else {
      console.error("Failed to save post");
    }
  };

  const handleChange = (key: string, value: string) => {
    setPost((prevPost) => ({ ...prevPost, [key]: value }));
  };

  const handleImageUpload = (image: ArrayBuffer) => {
    const buffer = Buffer.from(image);
    setPost((prevPost) => ({ ...prevPost, image: buffer }));
  };
 
  return (
    <div className="mx-auto w-full max-w-7xl flex flex-col justify-center items-center p-6 bg-white shadow-lg rounded-lg">
      {/* Le titre */}
      <div className="w-full mb-4">
        <input
          type="text"
          placeholder="Titre de l'article"
          value={post.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Le contenu */}
      <div className="w-full mb-4">
        <Editor
          content={post.content || ""}
          onChange={(content) => handleChange("content", content)}
        />
      </div>

      {/* L'image */}
      <div className="w-full mb-4">
        <ImageUploader onImageUpload={handleImageUpload} />
      </div>

      {/* Le bouton pour sauvegarder */}
      <button
        onClick={savePost}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Enregistrer le post
      </button>
    </div>
  );
}
