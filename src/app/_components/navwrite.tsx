'use client';
import Link from "next/link";
import { FiSearch, FiEdit, FiBell, FiUser } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { useState } from "react";
import { signOut } from "next-auth/react";
import ProfileDropdown from "./profile-dropdown"; // Import the ProfileDropdown component

export const Navwrite = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="relative z-10 flex items-center justify-between border-b border-gray-500 bg-[#f7f4ed] px-4 py-2">
      <div className="flex items-center space-x-4">
        <Link className="flex items-center space-x-2" href="/">
          <img src="/medium.webp" alt="Logo" className="h-10" />
        </Link>
        <span className="text-gray-500 mx-auto">Draft in Nhatminhtran</span>
      </div>
      <nav className="flex items-center space-x-4">
        <button className="rounded-full bg-green-700 px-4 py-1 font-semibold text-white hover:bg-green-600">
          Publish
        </button>
        <Link
          href="/notification"
          className="text-base text-gray-600 hover:text-black"
        >
          <FiBell className="h-6 w-6" />
        </Link>
        <div className="relative inline-flex items-center justify-center">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-base text-gray-600 hover:text-black"
          >
            <FaRegUserCircle className="h-6 w-6" />
          </button>
          {isDropdownOpen && <ProfileDropdown />} {/* Render ProfileDropdown when isDropdownOpen is true */}
        </div>
      </nav>
    </header>
  );
};
