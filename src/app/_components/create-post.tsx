"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react"; // Adjust the import path as necessary

export function CreatePost() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
      setTitle("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPost.mutate({ name, title });
      }}
      className="flex flex-col gap-4 w-full max-w-3xl"
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-4xl font-bold px-4 py-2 border-b border-gray-300 focus:outline-none"
      />
      <textarea
        placeholder="Tell your story..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full h-96 text-xl px-4 py-2 border-b border-gray-300 focus:outline-none"
      />
      <button
        type="submit"
        className="rounded-full bg-green-500 px-6 py-3 font-semibold text-white transition hover:bg-green-600 self-end"
        disabled={createPost.isPending}
      >
        {createPost.isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
