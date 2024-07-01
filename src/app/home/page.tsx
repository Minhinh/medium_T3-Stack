'use client';


import { Navbar } from "../_components/navbar";
import { Footer } from "../_components/footer";
import { CreatePost } from "../_components/create-post";
import { api } from "~/trpc/react";

const HomePage = () => {
  const { data: posts, isLoading, error } = api.post.getAll.useQuery();

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f7f4ed]">
        <h1 className="text-2xl mb-4">Create a New Post</h1>
        <CreatePost />
        {isLoading && <p>Loading...</p>}
        {error && <p>Something went wrong...</p>}
        {posts?.map((post)  => (
          <div key={post.id} className="p-4 m-2 border rounded w-full max-w-xl bg-white shadow-md">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="text-gray-600">{post.name}</p>
            <p className="text-gray-400 text-sm">
              Created at: {formatDate(post.createdAt)}
            </p>
            <p className="text-gray-400 text-sm">
              Updated at: {formatDate(post.updatedAt)}
            </p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
