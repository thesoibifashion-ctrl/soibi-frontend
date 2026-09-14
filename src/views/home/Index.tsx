"use client";

import { useCarousel, useCustomizations } from "@/api/features/home";
import Hero from "./Hero";
import Featured from "./Featured";
import { useProducts } from "@/api/features/products";
import { Product } from "@/types/Index";
import { useState } from "react";
import { QuickViewModal } from "@/components/shared/cards/modals/ProductView";
import { ProductCarousel } from "@/components/shared/carousels/ProductCarousel";
import { Marquee } from "@/components/shared/carousels/TextMarquee";
import Memory from "./Memory";
import LatestCollection from "./LatestCollection";
import Heritage from "./Heritage";
import Soibi from "./Soibi";
import HomeLoader from "./Loader";
import { InstagramCarousel } from "@/components/shared/carousels/InstagramCarousel";
import Categories from "./Categories";
// import { useCollections } from "@/api/features/collection";
import CurrencyPicker from "@/components/shared/CurrencyPicker";

const HomePage = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null
  );

  const {
    data: customizations,
    isLoading: customizationsLoading,
    isError: customizationsError,
  } = useCustomizations();

  const {
    data: carousel,
    isLoading: carouselLoading,
    isError: carouselError,
  } = useCarousel();

  const images: string[] = [
    "/home1.jpg",
    "/home2.jpg",
    "/home3.jpg",
    "/home4.jpg",
    "/home-5.jpg",
    "/home-6.jpg",
    "/home-7.jpg",
    "/home-8.jpg",
    "/home-9.jpg",
  ];
  const { data: data, isLoading } = useProducts();
  const carouselImage = carousel?.filter((item) => item.isActive) ?? [];
  const isHomeLoading = customizationsLoading || carouselLoading || isLoading;

  const products = data?.filter((item) => item.category === "Clothes");
  if (isHomeLoading) return <HomeLoader />;
  return (
    <div className=" bg-[#EEEEEE]">
      <Hero imageUrl={carouselImage[0]?.imageUrl || "/heros.jpg"} />

      {products && products.length > 0 && (
        <>
          <Featured />

          <div className="ml-[5%]">
            {products && (
              <ProductCarousel
                products={products}
                onQuickView={setQuickViewProduct}
              />
            )}
          </div>

          <QuickViewModal
            product={quickViewProduct}
            open={!!quickViewProduct}
            onOpenChange={(open) => !open && setQuickViewProduct(null)}
          />
        </>
      )}

      <div className="mt-11.25 md:mt-23.5">
        <Marquee
          items={["Colour", "Craft", "Movement", "Timeless"]}
          speed={25}
        />
      </div>

      <Memory />

      {customizations && customizations.length > 0 && (
        <LatestCollection customization={customizations} />
      )}

      <Categories products={data || []} />

      <div className="hidden lg:block">
        <Heritage />
      </div>
      {customizations && customizations.length > 0 && (
        <Soibi customization={customizations} />
      )}
      <div className=" lg:hidden">
        <Heritage />
      </div>
      <InstagramCarousel images={images} />
      <CurrencyPicker />
    </div>
  );
};

export default HomePage;
