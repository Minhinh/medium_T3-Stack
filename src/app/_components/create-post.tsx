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
      className="flex w-full max-w-3xl flex-col gap-4"
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded-full border-b  border-gray-300 px-4 py-2 text-5xl focus:outline-none"
      />
      <textarea
        placeholder="Tell your story..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="h-96 w-full px-4 py-2 text-xl  focus:outline-none"
      />
      <button
        type="submit"
        className="self-end rounded-full bg-green-500 px-6 py-3 font-semibold text-white transition hover:bg-green-600"
        disabled={createPost.isPending}
      >
        {createPost.isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
