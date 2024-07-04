"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/react";

export function CreatePost() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const createPost = api.post.create.useMutation({
    onSuccess: (post) => {
      router.push(`/post/${post.slug}`);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImage(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = "";
    if (image) {
      const filename = encodeURIComponent(image.name);
      const res = await fetch(`/api/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: filename,
          type: image.type,
        }),
      });

      const { url } = await res.json();

      await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': image.type,
        },
        body: image,
      });

      imageUrl = url.split('?')[0];
    }

    createPost.mutate({ name, title, imageUrl });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-3xl">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="rounded-full w-full text-4xl font-bold px-4 py-2 focus:outline-none"
      />
      <textarea
        placeholder="Tell your story..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full h-96 text-xl px-4 py-2 focus:outline-none"
      />
      <input type="file" accept="image/*" onChange={handleFileChange} />
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
