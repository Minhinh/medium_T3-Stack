import Link from 'next/link';

export const Navbar = () => {
  return (
    <header className="relative z-10 flex items-center justify-between px-4 py-4 bg-[#f7f4ed] border-b border-gray-500">
      <div className="flex items-center space-x-2 cursor-pointer">
        <img src="/medium.webp" alt="Logo" className="h-10" />
      </div>
      <nav className="flex space-x-4">
        <Link href="/story" className="text-lg">
          Our story
        </Link>
        <Link href="/membership" className="text-lg">
          Membership
        </Link>
        <Link href="/api/auth/signin" className="text-lg">
          Write
        </Link>
        <Link href="/api/auth/signin" className="text-lg">
          Sign in
        </Link>
        <Link
          href="/api/auth/signin"
          className="text-lg px-4 text-white bg-black rounded-full"
        >
          Get started
        </Link>
      </nav>
    </header>
  );
};