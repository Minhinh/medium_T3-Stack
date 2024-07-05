'use client';

import { Navwrite } from "../_components/navwrite";
import {Footer} from "../_components/footer";
import { CreatePost } from "../_components/create-post";

const WritePage = () => {
  return (
    <div className="m-auto max-w-screen-2xl flex flex-col min-h-screen bg-white">
      <Navwrite />
      <div className="flex flex-col items-center justify-center py-8">
        <CreatePost />
      </div>
      <Footer />
    </div>
  );
};

export default WritePage;
