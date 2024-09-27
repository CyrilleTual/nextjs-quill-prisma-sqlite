"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Post } from "@prisma/client";

const PostsList = () => {

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
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             {posts.map((post) => (
               <div
                 key={post.id}
                 className="flex flex-col min-w-[220px] h-full mb-6 p-6 border rounded-lg shadow-md bg-white transition-transform transform hover:scale-105"
               >
                 <h2 className="text-xl font-bold text-gray-800 mb-2 flex-grow-0">
                   {post.title}
                 </h2>
                 <p className="text-gray-600 mb-4 flex-grow-0">
                   {post.content}
                 </p>

                 {post.image && (
                   <div className="flex-grow flex justify-center items-center">
                     <Image
                       src={`data:image/jpeg;base64,${post.image}`}
                       alt={post.title}
                       width={200}
                       height={200}
                       unoptimized={true}
                       className="rounded-md"
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
};

export default PostsList;
