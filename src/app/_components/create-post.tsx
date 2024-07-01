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
      className="flex flex-col gap-2 w-full max-w-xl"
    >
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black border"
      />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black border"
      />
      <button
        type="submit"
        className="rounded-full bg-blue-500 px-10 py-3 font-semibold text-white transition hover:bg-blue-700"
        disabled={createPost.isPending}
      >
        {createPost.isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
