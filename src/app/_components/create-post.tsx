'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useSession, signIn } from "next-auth/react";
import { api } from "~/trpc/react";
import Image from "next/image";

export const CreatePost = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const router = useRouter();

  const { mutateAsync: createPost, isPending: isCreatingPost, error: createPostError } = api.post.create.useMutation();


  const buttonDisabled = loading || !file || !name || !title;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatusMessage("Creating");
    setLoading(true);

    if (file) {
      setStatusMessage("Uploading file");

      try {
        const signedUrlResult = await createPost({
          name,
          title,
          fileType: file.type,
        });

        const url = signedUrlResult.url;
        const postSlug = signedUrlResult.postSlug;

        if (url) {
          await fetch(url, {
            method: "PUT",
            body: file,
            headers: {
              "Content-Type": file.type ?? "",
            },
          });

          router.push(`/post/${postSlug}`);
        }

        setStatusMessage("Finished");
        setLoading(false);
      } catch (error) {
        setStatusMessage("Failed");
        setLoading(false);
        console.error('Error during file upload:', error); // Log error to console
      }
    }
  };

  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFile(file);

    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }

    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
    } else {
      setFileUrl(null);
    }
  };

  return (
    <div className="flex flex-col items-center bg-[white] px-4 py-8">
      <div className="w-full max-w-3xl">
        <form
          className="flex flex-col gap-4 w-full"
          action="/src/write"
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-full w-full text-4xl font-bold px-4 py-2  focus:outline-none"
          />
          <textarea
            placeholder="Tell your story..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-96 text-xl px-4 py-2  focus:outline-none"
          />
          <input
            type="file"
            name="media"
            accept="image/jpeg, image/png"
            onChange={onHandleChange}
            className="mb-4"
          />
          {fileUrl && (
          <div className="mt-8">
            <Image src={fileUrl} alt="preview" width={200} height={200} />
          </div>
        )}
          <button
            type="submit"
            className={`rounded-full px-6 py-3 font-semibold text-white transition ${
              buttonDisabled ? "bg-gray-500" : "bg-green-500 hover:bg-green-600"
            }`}
            disabled={buttonDisabled}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          {statusMessage && <p className="text-red-500">{statusMessage}</p>}
          
        </form>

      </div>
    </div>
  );
};
