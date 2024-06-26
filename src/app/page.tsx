import Link from "next/link";
import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <main className="min-h-screen bg-gray-50 text-black">
      <div className="container mx-auto py-6">
        <header className="flex items-center justify-between px-2">
          <h1 className="text-3xl font-bold">Medium</h1>
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
            <Link href="/signin" className="text-lg">
              Sign in
            </Link>
            <Link
              href="/get-started"
              className="px-4 py-2 text-white bg-black rounded-full"
            >
              Get started
            </Link>
          </nav>
        </header>
        <hr className="mt-4 border-gray-300" />

        <section className="relative flex flex-col items-start py-16 px-4 bg-gray-50">
          <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('/path-to-your-background-image.jpg')" }}></div>
          <h1 className="text-6xl font-bold leading-tight z-10">
            Human stories & ideas
          </h1>
          <p className="mt-4 text-xl text-gray-600 z-10">
            A place to read, write, and deepen your understanding
          </p>
          <button className="mt-8 px-8 py-3 text-xl text-white bg-black rounded-full z-10">
            Start reading
          </button>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8 px-4">
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-gray-100 p-4 hover:bg-gray-200"
            href="https://create.t3.gg/en/usage/first-steps"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">First Steps →</h3>
            <div className="text-lg">
              Just the basics - Everything you need to know to set up your
              database and authentication.
            </div>
          </Link>
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-gray-100 p-4 hover:bg-gray-200"
            href="https://create.t3.gg/en/introduction"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">Documentation →</h3>
            <div className="text-lg">
              Learn more about Create T3 App, the libraries it uses, and how to
              deploy it.
            </div>
          </Link>
        </section>

        <section className="flex flex-col items-center gap-2 mt-12">
          <p className="text-2xl">
            {hello ? hello.greeting : "Loading tRPC query..."}
          </p>

          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl">
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

        <CrudShowcase />

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
      </div>
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
