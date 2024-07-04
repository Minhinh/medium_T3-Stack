import { db } from '~/server/db';
import { Navwrite } from '~/app/_components/navwrite';
import { Footer } from '~/app/_components/footer';

interface PostPageProps {
  params: {
    slug: string;
  };
}

const PostPage = async ({ params }: PostPageProps) => {
  const { slug } = params;
  const post = await db.post.findUnique({
    where: { slug },
  });

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <div>
      <Navwrite />
      <div className="flex flex-col items-center bg-[#f7f4ed] px-4 py-8">
        <div className="w-full max-w-3xl bg-white p-4 rounded shadow">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-600 mb-4">{post.name}</p>
          {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="mb-4" />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PostPage;
