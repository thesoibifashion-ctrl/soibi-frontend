export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  imagePublicId?: string;
  category: string;
  sortOrder: number;
  isPublished: boolean;
}

import { useQuery } from "@tanstack/react-query";
import { publicApiGet } from "../requests/public";

export const getGallery = () =>
  publicApiGet<GalleryItem[]>("/api/gallery");


export function useGallery() {
  return useQuery({
    queryKey: ["gallery"],
    queryFn: getGallery,
  });
}

