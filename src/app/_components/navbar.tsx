import Link from 'next/link';
import { FiSearch, FiEdit, FiBell, FiUser } from 'react-icons/fi';
import { FaRegUserCircle } from "react-icons/fa";
import { useState } from 'react';
import { signOut } from 'next-auth/react';

const ProfileDropdown = () => {
  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  }
  return (
    <div className="absolute right-0 top-14 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
      <Link href="/profile" className="block px-4 py-2 text-gray-600 hover:text-black">
        Profile
      </Link>
      <Link href="/settings" className="block px-4 py-2 text-gray-600 hover:text-black">
        Settings
      </Link>
      <button onClick={handleSignOut} className="block w-full px-4 py-2 text-left text-gray-600 hover:text-black">
        Sign Out
      </button>
    </div>
  );
}

export const Navbar = () => {
  const [isFocused, setIsFocused] = useState(false); // Step 2: Track focus state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="relative z-10 flex items-center justify-between px-4 py-2 bg-[#f7f4ed] border-b border-gray-500">
      {/* Logo */}
      <Link className="flex items-center space-x-2" href="/">
        <img src="/medium.webp" alt="Logo" className="h-10" />
      </Link>

      {/* Search Bar */}
      <div className="flex-grow mx-3 relative">
        <form className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-2 py-2 rounded-full focus:outline-none"
            onFocus={() => setIsFocused(true)} // Track focus
            onBlur={() => setIsFocused(false)} // Track blur
          />
          <FiSearch className={`w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 ${isFocused ? 'text-black' : 'text-gray-400'}`} />
        </form>
      </div>

      {/* Navigation */}
      <nav className="flex space-x-8 items-center">
        <Link href="/write" className="flex items-center space-x-2 text-base text-gray-600 hover:text-black">
          <FiEdit className="w-5 h-5" />
          <span>Write</span>
        </Link>
        <Link href="/notification" className="text-base text-gray-600 hover:text-black">
          <FiBell className="w-6 h-6" />
        </Link>
        <div className="relative inline-flex items-center justify-center">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-base text-gray-600 hover:text-black"
          >
            <FaRegUserCircle className="w-6 h-6" />
          </button>
          {isDropdownOpen && <ProfileDropdown />}
        </div>
      </nav>
    </header>
  );
};