"use client";

import Hero from "./Hero";
import { useCollectionBySlug } from "@/api/features/collection";
import Products from "./Products";
import { InstagramCarousel } from "@/components/shared/carousels/InstagramCarousel";
import LoadingAnimation from "@/components/shared/GifLoader";

interface ViewCollectionPageProps {
  slug: string;
}
const images: string[] = [
  "/home1.jpg",
  "/home2.jpg",
  "/home3.jpg",
  "/home4.jpg",
  "/home-5.jpg",
  "/home-6.jpg",
  "/home-7.jpg",
  "/home-8.jpg",
  "/home-9.jpg"]
const ViewCollectionPage = ({ slug }: ViewCollectionPageProps) => {
  const {
    data: collection,
    isLoading: collectionLoading,
    isError: collectionError,
  } = useCollectionBySlug(slug);

  if (collectionLoading) return <div className="flex h-screen items-center w-full justify-center"><LoadingAnimation/></div>;

  if (collectionError || !collection) {
    return <div>Collection not found</div>;
  }

  return (
    <div>
      <Hero collection={collection} />
     <Products collection={collection}/>
      <div className="mt-[137px]">
<InstagramCarousel images={images}/>
</div>   
    </div>
  );
};

export default ViewCollectionPage;