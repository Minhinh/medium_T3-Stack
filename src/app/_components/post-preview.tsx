import Link from 'next/link';
import Image from 'next/image';
import { FiUser } from 'react-icons/fi';


interface Post {
    id: string;
    title: string;
    name: string;
    createdAt: string; // Assuming these are strings for simplicity
    updatedAt: string;
}

const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleString();
};

export const PostPreview = ({ post }: { post: Post }) => {
    return (
        <Link href={`/post/${post.id}`}>
            <div className="m-2 border-b p-3">
                {/* Author */}
                <div className="flex items-center">
                    <FiUser className="inline-block" />
                    <p className="text-sm px-1">{post.name}</p>
                </div>
                {/* Content */}
                <div className="flex items-center">
                    <div>
                        <h2 className="text-xl font-bold py-4">{post.title}</h2>
                        <h3 className="text-sm text-gray-500">{formatDate(post.createdAt)}</h3>
                    </div>
                    <Image src="/medium.webp" alt="Post Image" width={160} height={100} />

                </div>

            </div>
        </Link>

    );
};