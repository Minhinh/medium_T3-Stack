import Link from "next/link";
import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { Footer } from "~/app/_components/footer";
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerAuthSession();
  if (session?.user) {
    redirect('/home');
  }

  return (
    <main className="relative flex min-h-screen flex-col bg-[#f7f4ed] text-black">
      <div className="absolute inset-0 bg-cover bg-center"></div>
      <header className="relative z-10 flex items-center justify-between px-4 py-4 bg-[#f7f4ed] border-b border-gray-500">
        <div className="flex items-center space-x-2 cursor-pointer">
          <img src="/medium.webp" alt="Logo" className="h-10" />
        </div>
        <nav className="flex space-x-4 items-center">
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
            className="text-lg px-4 text-white bg-black rounded-full py-2"
          >
            Get started
          </Link>
        </nav>
      </header>

      {/* {CrudShowcase()} */}


      <section className="relative z-10 flex flex-grow flex-col items-start justify-center px-4 py-8">
        <h1 className="absolute" style={{ top: "20%", left: "10%" }}>
          <span className="text-7xl leading-tight  md:text-7xl">
            Human
            <br />
            <span className="block">stories & ideas</span>
          </span>
        </h1>
        <p
          className="absolute mt-4 text-2xl text-gray-500"
          style={{ top: "70%", left: "10%" }}
        >
          A place to read, write, and deepen your understanding
        </p>
        <button
          className="absolute mt-8 rounded-full bg-black px-8 py-3 text-xl text-white"
          style={{ top: "80%", left: "10%" }}
        >
          Start reading
        </button>
      </section>
      <Footer />
    </main>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.post.getLatest();

  return (
    <div className="mt-8 w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}