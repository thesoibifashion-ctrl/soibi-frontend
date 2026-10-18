"use client";

import { useMemo, useState } from "react";
import { useGallery } from "@/api/features/gallery";
import Container from "@/components/shared/Container";
import GallerySkeleton from "./Skeleton";

type GalleryImage = {
  id: string;
  title: string;
  imageUrl: string;
  imagePublicId?: string;
  category: string;
  sortOrder: number;
  isPublished: boolean;
};

export default function Gallery() {
  const [activeTab, setActiveTab] = useState("all");

  const {
    data,
    isLoading: collectionLoading,
    isError: collectionError,
  } = useGallery();

  const gallery = data ?? [];

  /*
   * Build tabs from categories returned by the backend.
   */
  const tabs = useMemo(() => {
    const categories = Array.from(
      new Set(gallery.map((item) => item.category)),
    );

    return [
      { value: "all", label: "All" },
      ...categories.map((category) => ({
        value: category,
        label: category
          .replace(/_/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase()),
      })),
    ];
  }, [gallery]);

  const images = useMemo(() => {
    if (activeTab === "all") {
      return [...gallery].sort(
        (a, b) => a.sortOrder - b.sortOrder,
      );
    }

    return gallery
      .filter((item) => item.category === activeTab)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }, [gallery, activeTab]);

  if (collectionLoading) {
    return <GallerySkeleton/>
  }

  if (collectionError) {
    return (
      <Container className="bg-[#F8F6F2] py-[43px]">
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
    <Container className="bg-[#F8F6F2] py-[43px]">
      <p className="text-lg lg:text-[40px] font-black">
        We Capture Every Moment possible
      </p>

      <section>
      <div className="mb-12 flex flex-col  justify-between gap-6 md:flex-row">
  <select
    value={activeTab}
    onChange={(e) => setActiveTab(e.target.value)}
    className="mt-[18px] rounded-full border border-[#E8E2D8] bg-white px-5 py-3 text-sm font-medium text-[#6B645D] outline-none"
  >
    {tabs.map((tab) => (
      <option key={tab.value} value={tab.value}>
        {tab.label}
      </option>
    ))}
  </select>
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
                    className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

                  <div className="absolute left-5 top-5">
                    <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
                      {image.title}
                    </span>
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