import { Navbar } from "../_components/navbar";
import { Footer } from "../_components/footer";
import { api } from "~/trpc/server";
import { useRouter } from "next/router";

const HomePage = () => {
  const name = "Bon";
  const result = api.post.hello(name);

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f7f4ed]">
        <h1>{result}</h1>
        <h1 className="text-2xl">Welcome to the homepage!</h1>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
