import { Navbar } from "../_components/navbar";
import {Footer } from "../_components/footer"
// app/homepage/page.tsx
const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-[#f7f4ed]">
        <h1 className="text-2xl">Welcome to the homepage!</h1>
        
      </div>
      <Footer />

    </div>
  );
};

export default HomePage;
