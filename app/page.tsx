 import prisma from '../lib/prisma';

export default async function Home() {
  const posts = await prisma.post.findMany();
  return (
    <main className="flex bg-slate-200 flex-col justify-center items-center min-h-full gap-2">
      <h1>Home</h1>
      <div className="p-4 flex flex-col gap-y-4">
         <ul className="flex flex-col gap-y-2">
        {posts.map((post) => (
          <li key={post.id}>{post.name}</li>
        ))}
      </ul>
      </div>
     
    </main>
  );
}
