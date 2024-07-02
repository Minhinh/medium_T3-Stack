'use client';

import { Navwrite } from "../_components/navwrite";
import { Footer } from "../_components/footer";
import { CreatePost } from "../_components/create-post";
import { api } from "~/trpc/react";// Adjust the import path as necessary

const HomePage = () => {
  const { data: posts, isLoading, error } = api.post.getAll.useQuery();

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div>
      <Navwrite />
      <div className="flex flex-col items-center bg-[#f7f4ed] px-4 py-8">
        <div className="w-full max-w-3xl">
          <CreatePost />
        </div>
        <div className="w-full max-w-3xl mt-8">
          {isLoading && <p>Loading...</p>}
          {error && <p>Something went wrong...</p>}
          {posts?.map((post) => (
            <div key={post.id} className="p-4 mb-6 border rounded bg-white shadow-md">
              <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.name}</p>
              <p className="text-gray-400 text-sm">
                Created at: {formatDate(post.createdAt)}
              </p>
              <p className="text-gray-400 text-sm">
                Updated at: {formatDate(post.updatedAt)}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
