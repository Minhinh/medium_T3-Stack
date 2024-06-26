import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-300 py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-4 text-gray-600">
          <Link href="/help">Help</Link>
          <Link href="/status">Status</Link>
          <Link href="/about">About</Link>
          <Link href="/careers">Careers</Link>
          <Link href="/press">Press</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/text-to-speech">Text to speech</Link>
          <Link href="/teams">Teams</Link>
        </div>
      </div>
    </footer>
  );
}
