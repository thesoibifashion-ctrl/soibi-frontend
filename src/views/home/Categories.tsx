"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/Index";
import Container from "@/components/shared/Container";
import AnimatedButton from "@/components/shared/AnimatedButton";

interface CategoriesProps {
  products: Product[];
}

const categoryImages: Record<string, string> = {
  Clothes: "/clothes.jpg",
  Bags: "/baggs.jpg",
  Shoes: "/shoes.jpg",
  Accessories: "/earrings.jpg",
};

const mainCategories = [ "Bags", "Shoes", "Accessories","Clothes"];

const Categories = ({ products }: CategoriesProps) => {
  // Get only the main categories that actually exist in the products
  const availableCategories = mainCategories.filter((category) =>
    products.some((product) => product.category === category)
  );

  // const hasMoreCategories = [
  //   ...new Set(products.map((product) => product.category)),
  // ].some((category) => !mainCategories.includes(category));

  return (
    <Container className="mt-20 md:mt-40.25">
      <div>
        <div className="flex items-center justify-between">
          <p className="text-[26px] md:text-[55px]">Our Products</p>
          <div className="w-fit">
          {/* <AnimatedButton text={"View more"} route={"/shop"} /> */}
<Link href={"/shop"} className="underline text-sm">
View more</Link>
          </div>
        </div>
        <div
          className={`mt-2 lg:mt-10 grid-cols-1 grid gap-4 ${
            availableCategories.length === 1
              ? "md:grid-cols-1"
              : availableCategories.length === 2
              ? "md:grid-cols-2"
              : availableCategories.length === 3
              ? "md:grid-cols-3"
              : "md:grid-cols-4"
          }`}
        >
          {availableCategories.map((category) => (
            <Link
              key={category}
              href={`/shop?category=${encodeURIComponent(category)}`}
              className="group relative overflow-hidden rounded-lg"
            >
              <div
                className={`relative w-full ${
                  availableCategories.length === 4 ? "h-111.25" : "h-100"
                }`}
              >
                <Image
                  src={categoryImages[category]}
                  alt={category}
                  fill
                  className="object-cover object-center lg:object-top transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-[#7B3C1091]" />

                {/* Category name */}
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-3xl font-medium text-white">
                    {category}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Categories;
