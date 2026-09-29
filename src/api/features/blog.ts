import {  apiPost, apiPatch, apiDelete } from  "@/api/requests/auth";
import { useQuery } from "@tanstack/react-query";
import { publicApiGet } from "../requests/public";

export type BlogStatus = "draft" | "published";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImageUrl: string | null;
  status: BlogStatus;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBlogPostPayload {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImageUrl?: string;
  status?: BlogStatus;
}

export interface UpdateBlogPostPayload {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  coverImageUrl?: string;
  status?: BlogStatus;
}
export const getBlogPosts = () => {
  return publicApiGet<BlogPost[]>("/api/blog");
};

export const getBlogPost = (id: string) => {
  return publicApiGet<BlogPost>(`/api/blog/${id}`);
};



export function useGetBlog() {
    return useQuery({
      queryKey: ["gallery"],
      queryFn: getBlogPosts,
    });
  }
  
  