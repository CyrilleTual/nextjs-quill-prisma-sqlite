// app/read/page.tsx

"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Post } from "@prisma/client";
import "./style.css";

export default function ReadPage() {
  type PostWithImage = Omit<Post, "image"> & {
    image?: string; // Définir le type de l'image comme Buffer ou string
  };

  const [posts, setPosts] = useState<PostWithImage[]>([]);

  useEffect(() => {
    // Récupérer les posts depuis l'API
    const fetchPosts = async () => {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <>
      {posts && posts.length > 0 ? (
        <div className="max-w-4xl mx-auto p-4">
          <h1 className="text-3xl text-center font-bold text-gray-800 mb-4">
            Voici les posts disponibles
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex lg:flex-col lg:items-center justify-around min-w-[220px] h-full mb-6 p-6 border rounded-lg shadow-md bg-white text-gray-800"
              >
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2 flex-grow-0">
                    {post.title}
                  </h2>
                  <div
                    className="prose"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  ></div>
                </div>

                {post.image && (
                  <div className="mt-4 mx-3 bg-slate-200 flex justify-center items-center  relative h-[200px] w-[200px] rounded-md">
                    <Image
                      src={`data:image/jpeg;base64,${post.image}`}
                      className="rounded-md"
                      alt="Image"
                      fill={true}
                      style={{ objectFit: "contain" }}
                      unoptimized={true}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto p-4 text-center text-gray-600">
          <p>Loading</p>
        </div>
      )}
    </>
  );
}
