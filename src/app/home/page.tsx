"use client";

import { Navbar } from "../_components/navbar";
import { Footer } from "../_components/footer";
import { api } from "~/trpc/react";
import { PostPreview } from "../_components/post-preview";

const HomePage = () => {
  const { data: posts, isLoading, error } = api.post.getAll.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts</div>;

  // Fake data for UI on the right
  const fakeData = [
    {
      id: 1,
      title: "How in 2024 Labour won a big majority on a similar share of the vote that brought defeat in 2019",
      author: "Nigel Stanley",
    },
    {
      id: 2,
      title: "How to get answers quickly and avoid features that flop",
      author: "Rosie Hoggmascall in UX Collective",
    },
    {
      id: 3,
      title: "Learning to Draw While Losing My Sight",
      author: "Patricia Timmermans in ENGAGE",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="m-12 max-w-screen">
        <div className="flex min-h-screen max-w-screenitems-start justify-evenly bg-white">
          {/* Main content - Posts */}
          <div className="w-7/10 flex flex-col md:max-w-[728px]">
            <div className="border-b-2 border-gray-200 pb-4 mb-12">
              <div className="flex space-x-8">
                <a href="#" className="font-semibold">For you</a>
                <a href="#">Following</a>
                <a href="#">Programming</a>
                <a href="#">Data Science</a>
                <a href="#">Technology</a>
              </div>
            </div>
            {posts?.map((post) => (
              <PostPreview post={post} key={post.id} />
            ))}
          </div>

          {/* Sidebar or secondary content */}
          <div className="w-3/10 flex flex-col border-l-2 px-10 md:w-[368px]">
            <div className="mb-4">
              <h3 className="text-lg font-bold">Staff Picks</h3>
              {fakeData.map((item) => (
                <div key={item.id} className="my-8">
                  <p>{item.author}</p>
                  <p className="font-semibold">{item.title}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-bold">Recommended topics</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {["Psychology", "Python", "Money", "Health", "Business", "Science", "Life"].map((topic) => (
                  <span key={topic} className="bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-700">{topic}</span>
                ))}
              </div>
              <a href="#" className="mt-4 text-green-600">See more topics</a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
