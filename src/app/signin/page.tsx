'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
// import Navbar from './_components/Navbar';

const SignInPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/homepage'); // Redirect to homepage if already signed in
    }
  }, [session, router]);

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-[#f7f4ed]">
        <button
          onClick={() => signIn()}
          className="px-8 py-3 text-xl text-white bg-black rounded-full"
        >
          Sign in
        </button>
      </div>
    </>
  );
};

export default SignInPage;
