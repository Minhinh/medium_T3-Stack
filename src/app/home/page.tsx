import { Navbar } from "../_components/navbar";
import { Footer } from "../_components/footer";
import { postRouter } from "~/server/api/routers/post";

// app/homepage/page.tsx
const HomePage = () => {
  const result = postRouter.getSecretMessage;
  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center bg-[#f7f4ed]">
        <h1 className="text-2xl">Welcome to the homepage!</h1>
        <h1>{result.toString()}</h1>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
