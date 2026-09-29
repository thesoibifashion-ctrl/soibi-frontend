"use client"
import { BlogPost, useGetBlog } from "@/api/features/blog";
import BlogCard from "@/components/shared/cards/BlogCard";
import Container from "@/components/shared/Container";
import Link from "next/link";

interface BlogPostContentProps {
  post: BlogPost;
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  const {
    data,
    isLoading: collectionLoading,
    isError: collectionError,
  } = useGetBlog();

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

    console.log(data)

  return (
    <div className="bg-[#F7F0E8]">
      <Container className="pt-[120px] pb-12">
        {post.coverImageUrl && (
          <div
            className="relative w-full h-80 md:h-[705px] mx-auto rounded-lg bg-cover bg-top bg-no-repeat"
            style={{
              backgroundImage: `url(${post.coverImageUrl})`,
            }}
          />
        )}

        <div className="mt-6 max-w-3xl mx-auto">
          <div className="flex items-center gap-3">
            <div>
              <p className="text-xs font-medium text-[#434846] py-1 px-3 bg-[#E0E3E1] rounded-full ">
                {post.excerpt}
              </p>
            </div>
            <div className="p-0.5 rounded-full bg-[#404944]"></div>
            <div>
              <p className="font-medium text-xs text-[#404944]">
                {formattedDate}
              </p>
            </div>
          </div>

          <h1 className="font-semibold mt-8 text-2xl md:text-[32px] text-black">
            {post.title}
          </h1>

          {post.excerpt && <p className="mt-3 text-gray-600">{post.excerpt}</p>}

          <div
  className="
    mt-8 max-w-none text-[16px] text-black leading-8

    [&_h1]:text-4xl
    [&_h1]:font-semibold
    [&_h1]:leading-tight
    [&_h1]:mt-0
    [&_h1]:mb-8

    [&_h2]:text-2xl
    [&_h2]:font-semibold
    [&_h2]:leading-tight
    [&_h2]:mt-12
    [&_h2]:mb-5

    [&_h3]:text-xl
    [&_h3]:font-semibold
    [&_h3]:mt-8
    [&_h3]:mb-4

    [&_p]:mb-6
    [&_p]:leading-8

    [&_ul]:list-disc
    [&_ul]:pl-6
    [&_ul]:mb-7

    [&_ol]:list-decimal
    [&_ol]:pl-6
    [&_ol]:mb-7

    [&_li]:mb-2
    [&_li_p]:mb-0

    [&_strong]:font-semibold

    [&_img]:w-full
    [&_img]:rounded-xl
    [&_img]:my-10

    [&_.youtube-embed]:w-full
    [&_.youtube-embed]:my-10

    [&_iframe]:w-full
    [&_iframe]:aspect-video
    [&_iframe]:h-auto
    [&_iframe]:rounded-xl
  "
  dangerouslySetInnerHTML={{
    __html: post.content,
  }}
/>

        
        </div>
        <div className="mt-[136px]">
          <div className="flex w-full justify-between items-center">
            <p className="font-normal text-[32px] text-[#000000]">Blogs</p>
            <Link href={"/blog"} className="font-semibold text-base text-[#A56423]">View All Posts</Link>
          </div>
            <div className="mt-15 grid grid-cols-1 lg:grid-cols-3 gap-10">
              {data?.map((item) => (
                <BlogCard key={item.id} post={item} />
              ))}
            </div>
          </div>
      </Container>
    </div>
  );
}
