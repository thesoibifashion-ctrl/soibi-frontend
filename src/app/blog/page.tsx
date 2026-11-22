import BlogPage from "@/views/blog/Index";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={null}>
      <BlogPage />
    </Suspense>
  );
};

export default page;
