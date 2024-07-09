'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { api } from '~/trpc/react';
import { PostPreview } from '../_components/post-preview';
import { Navbar } from '../_components/navbar';
import { Footer } from '../_components/footer';

interface Post {
  id: number;
  title: string;
  name: string;
  imageUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const ProfilePage = () => {
  const { data: posts} = api.post.getByUser.useQuery();


  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen max-w-screenitems-start justify-evenly bg-white">
          {/* Main content - Posts */}
          <div className="w-7/10 flex flex-col md:max-w-[728px]">
            <div className="pb-4 mb-12">
            </div>
            {posts?.map((post) => (
              <PostPreview post={post} key={post.id} />
            ))}
          </div>
        </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
