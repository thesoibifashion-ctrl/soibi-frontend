"use client";

import { Skeleton } from "@/components/ui/skeleton";
import Container from "@/components/shared/Container";

export default function GallerySkeleton() {
  return (
    <Container className="bg-[#F8F6F2] pt-[43px]">
      {/* Heading */}
      <div className="mb-8">
        <Skeleton className="h-12 w-[420px] max-w-full bg-[#DED9D0]" />
      </div>

      {/* Tabs */}
      <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="mt-[18px] flex flex-wrap justify-center gap-3 rounded-full border border-[#E8E2D8] bg-white p-2">
          <Skeleton className="h-9 w-16 rounded-full bg-[#DED9D0]" />
          <Skeleton className="h-9 w-24 rounded-full bg-[#DED9D0]" />
          <Skeleton className="h-9 w-32 rounded-full bg-[#DED9D0]" />
          <Skeleton className="h-9 w-28 rounded-full bg-[#DED9D0]" />
        </div>
      </div>

      {/* Gallery */}
      <div className="grid auto-rows-[240px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 12 }).map((_, index) => {
          const featured =
            index % 7 === 0 || index % 11 === 3;

          return (
            <Skeleton
              key={index}
              className={`rounded-3xl bg-[#DED9D0] ${
                featured
                  ? "row-span-2 lg:col-span-2"
                  : "row-span-1"
              }`}
            />
          );
        })}
      </div>
    </Container>
  );
}