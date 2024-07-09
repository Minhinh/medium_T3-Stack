import Link from "next/link";
import Image from "next/image";
import { FiUser } from "react-icons/fi";

interface Post {
  id: string;
  title: string;
  name: string;
  updatedAt: string;
}

const formatDate = (dateString: string | number | Date) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export const PostPreview = ({ post }: { post: Post }) => {
  return (
    <Link href={`/post/${post.slug}`}>
      <div className="m-2 border-b p-3">
        {/* Author */}
        <div className="flex items-center">
          <FiUser className="inline-block" />
          <p className="px-1 text-sm">{post.name}</p>
        </div>
        {/* Content */}
        <div className="flex items-center">
          <div>
            <div className = "my-4">
              <h2 className="mb-1 text-2xl font-bold">{post.title}</h2>
              <p className="text-l text-gray-700">
                Let’s face the uneasy truth: without a deep knowledge of the
                mathematics behind grinding algorithms and data structures
              </p>
            </div>

            <h3 className="text-sm text-gray-500">
              {formatDate(post.updatedAt)}
            </h3>
          </div>
          {<img src={post.imageUrl} alt={post.title} width={160} height={100} className="mb-4" />}
        </div>
      </div>
    </Link>
  );
};
