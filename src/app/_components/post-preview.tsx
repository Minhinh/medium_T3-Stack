'use client';

export const PostPreview = ({ post }) => {
  return (
    <div className="p-4 mb-6 border rounded bg-white shadow-md">
      <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
      <p className="text-gray-600 mb-4">{post.name}</p>
      {post.imageUrl && (
        <img src={post.imageUrl} alt={post.title} className="w-full h-auto mb-4"/>
      )}
      <p className="text-gray-400 text-sm">
        Created at: {new Date(post.createdAt).toLocaleString()}
      </p>
      <p className="text-gray-400 text-sm">
        Updated at: {new Date(post.updatedAt).toLocaleString()}
      </p>
    </div>
  );
};
