"use client";

import { useGetBlog } from "@/api/features/blog";
import Container from "@/components/shared/Container";
import GallerySkeleton from "./Skeleton";
import BlogCard from "@/components/shared/cards/BlogCard";

const Blog = () => {
  const {
    data,
    isLoading: collectionLoading,
    isError: collectionError,
  } = useGetBlog();

  if (collectionLoading) {
    return <GallerySkeleton />;
  }
console.log(data, "data");
  if (collectionError) {
    return (
      <Container className="bg-[#F8F6F2] pt-[43px]">
        <div className="py-24 text-center">
          <h3 className="text-xl font-semibold text-[#1C1917]">
            Unable to load gallery
          </h3>

          <p className="mt-3 text-sm text-[#78716C]">
            Please try again later.
          </p>
        </div>
      </Container>
    );
  }

  return (
    <div className="bg-[#F7F0E8] min-h-screen">
      <Container className="pt-[120px]">
        <div>
          <p className="text-[50px]">Blogs</p>

          <p className="text-[15px] text-[#595959] w-full max-w-full lg:w-133.75">
            A record of your Soibi orders, from the moment your selection was
            submitted to its journey with us.
          </p>
        </div>

        <div className="mt-15 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {data?.map((item) => (
            <BlogCard key={item.id} post={item} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Blog;