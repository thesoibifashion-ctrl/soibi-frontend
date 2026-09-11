"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useGallery } from "@/api/features/gallery";
import Container from "@/components/shared/Container";


type Category = "workshop" | "craftsmanship" | "completed_work";

type GalleryImage = {
    id: string;
    title: string;
    imageUrl: string;
    imagePublicId?: string;
    category: string;
    sortOrder: number;
    isPublished: boolean;
};

type GalleryResponse = {
  success: boolean;
  message: string;
  data: GalleryImage[];
};

const tabs = [
  { value: "all", label: "All" },
  { value: "workshop", label: "Events" },
  { value: "craftsmanship", label: "Inspirations" },
  { value: "completed_work", label: "Completed Work" },
] as const;

const categoryLabel: Record<Category, string> = {
  workshop: "Workshop",
  craftsmanship: "Craftsmanship",
  completed_work: "Completed Work",
};

export default function Gallery() {
  const [activeTab, setActiveTab] =
    useState<(typeof tabs)[number]["value"]>("all");

   const {
     data: data,
     isLoading: collectionLoading,
     isError: collectionError,
   } = useGallery();
 
  const images = useMemo(() => {
    const gallery = data ?? [];

    if (activeTab === "all") {
      return [...gallery].sort((a, b) => a.sortOrder - b.sortOrder);
    }

    return gallery
      .filter((item) => item.category === activeTab)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }, [data, activeTab]);

//   if (isLoading) return <GalleryLoading />;

//   if (isError) return <GalleryError />;

  return (
    <Container className="bg-[#F8F6F2] pt-[43px]">
        <p className="text-[40px] font-black">We Capture Every Moment possible</p>
      {/* Gallery */}
      <section className="0">
        <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row">
       
          <div className="flex mt-[18px] flex-wrap justify-center gap-3 rounded-full border border-[#E8E2D8] bg-white p-2">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  activeTab === tab.value
                    ? "bg-[#1C1917] text-white"
                    : "text-[#6B645D] hover:bg-[#F4EFE8]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {images.length === 0 ? (
          <div className="py-24 text-center">
            <h3 className="text-xl font-semibold text-[#1C1917]">
              No images available
            </h3>

            <p className="mt-3 text-sm text-[#78716C]">
              This category is currently empty.
            </p>
          </div>
        ) : (
          <div className="grid auto-rows-[240px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {images.map((image, index) => {
              const featured =
                index % 7 === 0 || index % 11 === 3;

              return (
                <div
                  key={image.id}
                  className={`group relative overflow-hidden rounded-3xl ${
                    featured
                      ? "row-span-2 lg:col-span-2"
                      : "row-span-1"
                  }`}
                >
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

                  <div className="absolute left-5 top-5">
                    <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
                      {/* {categoryLabel[image.category]} */}
                    </span>
                  </div>

                  <div className="absolute bottom-0 pb-10 left-0 right-0 translate-y-6 p-6 transition duration-500 group-hover:translate-y-0">
                    <h3 className="font-display text-2xl font-semibold text-white">
                      {image.title}
                    </h3>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </Container>
  );
}