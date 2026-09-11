import { useQuery } from "@tanstack/react-query";
import { publicApiGet } from "../requests/public";
import { Product } from "@/types/Index";

export type CollectionStatus = "draft" | "published" | "archived";

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  imagePublicId: string | null;
  status: CollectionStatus;
  isFeatured: boolean;
  sortOrder: number;
  productCount: number;
  products?:Product[]
  createdAt: string;
  updatedAt: string;
}

export interface CreateCollectionPayload {
  name: string;
  slug: string;
  description?: string | null;
  imageUrl?: string | null;
  imagePublicId?: string | null;
  status?: CollectionStatus;
  isFeatured?: boolean;
  sortOrder?: number;
}

export interface UpdateCollectionPayload {
  name?: string;
  slug?: string;
  description?: string | null;
  imageUrl?: string | null;
  imagePublicId?: string | null;
  status?: CollectionStatus;
  isFeatured?: boolean;
  sortOrder?: number;
}

export const getCollections = () => {
  return publicApiGet<Collection[]>("/api/collections");
};

export const getCollectionBySlug = (slug: string) => {
  return publicApiGet<Collection>(`/api/collections/${slug}`);
};

export const useCollections = () => {
  return useQuery({
    queryKey: ["collections"],
    queryFn: getCollections,
  });
};

export const useCollectionBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["collections-slug", slug],
    queryFn: () => getCollectionBySlug(slug),
    enabled: !!slug,
  });
};