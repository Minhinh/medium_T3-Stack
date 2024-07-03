'use client';

import { Navbar } from "../_components/navbar";
import { Footer } from "../_components/footer";
import { CreatePost } from "../_components/create-post";
import { api } from "~/trpc/react";

import { PostPreview } from "../_components/post-preview";

const HomePage = () => {
  //const { data: posts, isLoading, error } = api.post.getAll.useQuery();

  // create some fake posts
  const posts = [  
    { id: "1", title: "Post 1", name: "John Doe", createdAt: "2022-01-01T00:00:00Z", updatedAt: "2022-01-01T00:00:00Z" },
    { id: "2", title: "Post 2", name: "Jane Doe", createdAt: "2022-01-01T00:00:00Z", updatedAt: "2022-01-01T00:00:00Z" },
    { id: "3", title: "Post 3", name: "John Doe", createdAt: "2022-01-01T00:00:00Z", updatedAt: "2022-01-01T00:00:00Z" },
  ];

  return (
    <div>
      <Navbar />

      <div className="flex min-h-screen max-w-screen-2xl items-center justify-evenly bg-white">
        {/* Main content - Posts */}
        <div className="flex flex-col w-7/10">
          {posts?.map((post) => (
            <PostPreview post={post} key={post.id} />
          ))}
        </div>

        {/* Sidebar or secondary content - takes 3 parts */}
        <div className="flex w-3/10 border-l-2 border-gray-200 px-10">
          {/* Sidebar content here */}
          <p>rrr</p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;

