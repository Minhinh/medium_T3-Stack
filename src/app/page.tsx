import Link from "next/link";
import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { Navbar } from "~/app/_components/navbar";
import { Footer } from "~/app/_components/footer";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <main className="relative flex min-h-screen flex-col bg-[#f7f4ed] text-black">
      <div className="absolute inset-0 bg-cover bg-center"></div>
      <Navbar />

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

      <section className="relative z-10 flex flex-col items-start justify-center px-4 py-4">
        <p className="text-2xl">
          {hello ? hello.greeting : "Loading tRPC query..."}
        </p>
        <div className="mt-4 flex flex-col items-start gap-4">
          <p className="text-xl">
            {session && <span>Logged in as {session.user?.name}</span>}
          </p>
          <Link
            href={session ? "/api/auth/signout" : "/api/auth/signin"}
            className="rounded-full bg-gray-800 px-10 py-3 font-semibold text-white no-underline transition hover:bg-gray-700"
          >
            {session ? "Sign out" : "Sign in"}
          </Link>
        </div>
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
