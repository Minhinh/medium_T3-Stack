import Link from "next/link";
import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <main className="relative min-h-screen bg-[#f7f4ed] text-black flex flex-col">
      <div className="absolute inset-0 bg-cover bg-center"></div>
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
          <Link href="/write" className="text-lg">
            Write
          </Link>
          <Link href="/api/auth/signin" className="text-lg">
            Sign in
          </Link>
          <Link
            href="/get-started"
            className="text-lg px-4 text-white bg-black rounded-full"
          >
            Get started
          </Link>
        </nav>
      </header>

      <section className="relative z-10 flex flex-col items-start justify-center flex-grow px-4 py-8">
  <h1 className="absolute" style={{ top: '20%', left: '10%' }}>
    <span className="text-7xl md:text-7xl  leading-tight">
      Human
      <br />
      <span className="block">stories & ideas</span>
    </span>
  </h1>
  <p className="absolute mt-4 text-2xl text-gray-500" style={{ top: '70%', left: '10%' }}>
    A place to read, write, and deepen your understanding
  </p>
  <button className="absolute mt-8 px-8 py-3 text-xl text-white bg-black rounded-full" style={{ top: '80%', left: '10%' }}>
    Start reading
  </button>
</section>


      <section className="relative z-10 flex flex-col items-start justify-center px-4 py-4">
        <p className="text-2xl">
          {hello ? hello.greeting : "Loading tRPC query..."}
        </p>
        <div className="flex flex-col items-start gap-4 mt-4">
          <p className="text-xl">
            {session && <span>Logged in as {session.user?.name}</span>}
          </p>
          <Link
            href={session ? "/api/auth/signout" : "/api/auth/signin"}
            className="rounded-full bg-gray-800 text-white px-10 py-3 font-semibold no-underline transition hover:bg-gray-700"
          >
            {session ? "Sign out" : "Sign in"}
          </Link>
        </div>
      </section>

      <footer className="relative z-10 py-4 bg-[#f7f4ed] border-t border-gray-300">
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
    </main>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.post.getLatest();

  return (
    <div className="w-full max-w-xs mt-8">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
