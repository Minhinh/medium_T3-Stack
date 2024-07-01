'use client';

import { useState } from "react";
import { Navbar } from "../_components/navbar";
import { Footer } from "../_components/footer";
//import { trpc } from "~/utils/trpc"; // Adjust the import path as necessary
import { api } from "~/trpc/react";

const HomePage = () => {
  const { data: posts, isLoading, error } = api.post.getAll.useQuery();
  const createPost = api.post.create.useMutation();
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPost.mutateAsync({ title, name });
    setTitle("");
    setName("");
  };

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f7f4ed]">
        <h1 className="text-2xl mb-4">Create a New Post</h1>
        <form onSubmit={handleSubmit} className="mb-8">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="p-2 border rounded mb-2"
          />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="p-2 border rounded mb-2"
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">
            Create Post
          </button>
        </form>
        {isLoading && <p>Loading...</p>}
        {error && <p>Something went wrong...</p>}
        {posts && posts.map((post) => (
          <div key={post.id} className="p-4 m-2 border rounded">
            <h2 className="text-xl font-bold">fff</h2>
            <p>{post.name}</p>
          </div>
        ))}
        <h1 className="text-2xl">Welcome to the homepage!</h1>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
