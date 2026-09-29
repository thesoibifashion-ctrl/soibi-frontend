import Image from "next/image";
import Link from "next/link";
import { SquareArrowOutUpRight } from "lucide-react";
import type { BlogPost } from "@/api/features/blog";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <div className="bg-[#E2D8E8] rounded-[12px]">
      <div className="h-[470px]">
        <Image
          width={410}
          height={470}
          className="h-full w-full rounded-t-[12px] object-cover"
          src={post.coverImageUrl ?? ""}
          alt={`${post.title} image`}
        />
      </div>

      <div className="px-4 py-3 flex flex-col">
        <p className="text-[16px] text-[#1A1C1B]">
          {post.title.length > 45
            ? `${post.title.slice(0, 45)}...`
            : post.title}
        </p>

        {post.excerpt && (
          <p className="mt-3 text-[#765996] italic text-sm">
            {post.excerpt}
          </p>
        )}

        <p
          className="mt-3 text-[15px] text-[#000000]"
          dangerouslySetInnerHTML={{
            __html: post.content?.slice(0, 150) ?? "",
          }}
        />

        <Link
          href={`/blog/${post.slug}`}
          className="text-[#765996] self-end font-semibold text-sm mt-6 flex items-center gap-1"
        >
          View More <SquareArrowOutUpRight size={14} />
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;