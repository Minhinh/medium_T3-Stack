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
    { id: "1", title: "Post 1", name: "John Doe", updatedAt: "2022-01-01T00:00:00Z" },
    { id: "2", title: "Post 2", name: "Jane Doe", updatedAt: "2022-01-01T00:00:00Z" },
    { id: "3", title: "Post 3", name: "John Doe", updatedAt: "2022-01-01T00:00:00Z" },
  ];

  return (
    <div>
      <Navbar />
      <div className="m-auto max-w-screen-2xl">
        <div className="flex min-h-screen max-w-screen-2xl items-center justify-evenly bg-white">
          {/* Main content - Posts */}
          <div className="flex flex-col w-7/10 md:max-w-[728px]">
            {posts?.map((post) => (
              <PostPreview post={post} key={post.id} />
            ))}
          </div>

          {/* Sidebar or secondary content - takes 3 parts */}
          <div className="flex w-3/10 border-l-2 border-gray-200 px-10 md:w-[368px]">
            {/* Sidebar content here */}
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Donec sagittis dictum dui, sit amet fringilla sapien placerat consequat. 
              Sed id justo ullamcorper, ultricies ligula eget, finibus nisl. 
              Proin non metus quis ligula semper tincidunt at suscipit turpis. 
              Sed iaculis placerat fermentum. Mauris vitae risus porttitor, egestas justo eget, ullamcorper orci. 
              Sed a eros dignissim, dictum nunc ut, feugiat magna. Proin felis ex, commodo porta mauris sed, porta elementum leo. 
              Etiam mollis ac libero id dignissim. Vestibulum id volutpat justo. Aliquam elementum nibh quis neque scelerisque malesuada. 
              Aliquam ac purus vitae tellus vulputate facilisis. 
              Donec cursus, turpis et maximus gravida, sapien metus congue felis, hendrerit congue urna nunc eu odio. 
              Vestibulum sed augue ac nisi facilisis venenatis sed euismod justo. 
              Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
            </p>
          </div>
        </div>
      </div>


      <Footer />
    </div>
  );
};

export default HomePage;

