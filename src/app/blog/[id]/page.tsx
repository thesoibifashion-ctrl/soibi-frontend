import { getBlogPost } from "@/api/features/blog";
import BlogPostContent from "@/views/blog/Details";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BlogPost({
  params,
}: PageProps) {
  const { id } = await params;

  let post;

  try {
    const response = await getBlogPost(id);
    post = response;
  } catch (error) {
    throw new Error("Unable to load blog post");
  }

  if (!post) {
    return null;
  }

  return <BlogPostContent post={post} />;
}