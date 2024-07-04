"use client";

import { getSignedURL } from "./action";
import Image from "next/image";
import { useState } from "react";
import { Navwrite } from "../_components/navwrite";
import { Footer } from "../_components/footer";

type Props = {};

const Upload = (props: Props) => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");

  const buttonDisabled = loading || !file;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatusMessage("Creating");
    setLoading(true);

    console.log({ file });

    if (file) {
      setStatusMessage("Uploading file");

      const signedUrlResult = await getSignedURL();
      if (signedUrlResult.error) {
        setStatusMessage("Failed");
        setLoading(false);
        console.log(signedUrlResult.error.message);
        return;
      }
      const url = signedUrlResult.success?.url;

      await fetch(url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file?.type || "",
        },
      });
    }

    setStatusMessage("Finished");
    setLoading(false);
  };

  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFile(file);

    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }

    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
    } else {
      setFileUrl(undefined);
    }
  };
  console.log(file);
  return (
    <div className="m-auto max-w-screen-2xl flex flex-col min-h-screen bg-white">
      <Navwrite />
      <div className="flex flex-col items-center justify-center py-8">

        <form
          className="flex flex-col gap-4 w-full max-w-3xl"
          action="/src/write"
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-full w-full text-2xl px-4 py-2  focus:outline-none"
          />
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
              buttonDisabled ? "bg-gray-500" : "bg-green-700 hover:bg-green-600"
            }`}
            disabled={buttonDisabled}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          {statusMessage && <p className="text-red-500">{statusMessage}</p>}
        </form>
        
      </div>
      <Footer />
    </div>
  );
};

export default Upload;
