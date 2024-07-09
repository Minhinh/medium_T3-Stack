"use client";

import Link from "next/link";
import { FiUser, FiBookmark, FiFileText, FiBarChart } from "react-icons/fi";
import { signOut, useSession } from "next-auth/react";

const ProfileDropdown = () => {
  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <div className="absolute right-0 top-10 w-60 rounded-lg border border-gray-200 bg-white shadow-lg">
      <Link
        href="/profile"
        className="block flex items-center px-4 py-2 text-gray-600 hover:text-black"
      >
        <FiUser className="mr-2" /> Profile
      </Link>
      <Link
        href="/library"
        className="block flex items-center px-4 py-2 text-gray-600 hover:text-black"
      >
        <FiBookmark className="mr-2" /> Library
      </Link>
      <Link
        href="/stories"
        className="block flex items-center px-4 py-2 text-gray-600 hover:text-black"
      >
        <FiFileText className="mr-2" /> Stories
      </Link>
      <Link
        href="/stats"
        className="block flex items-center px-4 py-2 text-gray-600 hover:text-black"
      >
        <FiBarChart className="mr-2" /> Stats
      </Link>
      <div className="my-2 border-t"></div>
      <Link
        href="/stats"
        className="block flex items-center px-4 py-2 text-gray-600 hover:text-black"
      >Settings
      </Link>
      <Link
        href="/stats"
        className="block flex items-center px-4 py-2 text-gray-600 hover:text-black"
      >Refine Recommendations
      </Link>
      <Link
        href="/stats"
        className="block flex items-center px-4 py-2 text-gray-600 hover:text-black"
      >Manage Publications
      </Link>
      <Link
        href="/stats"
        className="block flex items-center px-4 py-2 text-gray-600 hover:text-black"
      >Help
      </Link>
      <div className="my-2 border-t"></div>
      <Link
        href="/stats"
        className="block flex items-center px-4 py-2 text-gray-600 hover:text-black"
      >Become a Medium member
      </Link>
      <Link
        href="/stats"
        className="block flex items-center px-4 py-2 text-gray-600 hover:text-black"
      >Gift a membership
      </Link>
      <Link
        href="/stats"
        className="block flex items-center px-4 py-2 text-gray-600 hover:text-black"
      >Apply to the Parter Program
      </Link>
      <button
        onClick={handleSignOut}
        className="block flex w-full items-center px-4 py-2 text-left text-gray-600 hover:text-black"
      >
        <FiUser className="mr-2" /> Sign Out
      </button>
    </div>
  );
};

export default ProfileDropdown;
