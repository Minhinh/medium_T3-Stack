'use client';

import Link from "next/link";
import { FiUser, FiBookmark, FiFileText, FiBarChart } from "react-icons/fi";
import { signOut, useSession } from "next-auth/react";

const ProfileDropdown = () => {
  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <div className="absolute right-0 top-14 w-48 rounded-lg border border-gray-300 bg-white shadow-lg">
      <Link
        href="/profile"
        className="block px-4 py-2 text-gray-600 hover:text-black flex items-center"
      >
        <FiUser className="mr-2" /> Profile
      </Link>
      <Link
        href="/library"
        className="block px-4 py-2 text-gray-600 hover:text-black flex items-center"
      >
        <FiBookmark className="mr-2" /> Library
      </Link>
      <Link
        href="/stories"
        className="block px-4 py-2 text-gray-600 hover:text-black flex items-center"
      >
        <FiFileText className="mr-2" /> Stories
      </Link>
      <Link
        href="/stats"
        className="block px-4 py-2 text-gray-600 hover:text-black flex items-center"
      >
        <FiBarChart className="mr-2" /> Stats
      </Link>
      <div className="border-t my-2"></div>
      <button
        onClick={handleSignOut}
        className="block w-full px-4 py-2 text-left text-gray-600 hover:text-black flex items-center"
      >
        <FiUser className="mr-2" /> Sign Out
      </button>
    </div>
  );
};

export default ProfileDropdown;
