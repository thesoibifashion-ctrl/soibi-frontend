"use client";
import Container from "@/components/shared/Container";
import { useIsMobile } from "@/hooks/use-isMobile";
import Image from "next/image";
import Link from "next/link";
const Footer = () => {
  const isMobile = useIsMobile();
  return (
    <footer className=" bg-black py-16 text-white">
      <Container>
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-40">
          <div className="w-full lg:w-[30%]">
            <Image
              src="/soibi.svg"
              alt="Logo"
              width={isMobile ? 70 : 100}
              height={isMobile ? 70 : 100}
            />
            <p className="mt-4 max-w-xs font-sans text-sm leading-6 text-[#A5A9A7]">
              A contemporary ode to femininity, heritage, craftsmanship, and
              timeless elegance.
            </p>
          </div>

          <div className="grid w-full grid-cols-2 gap-10 sm:grid-cols-3 lg:w-[70%] lg:gap-0">
            <div>
              <h3 className="mb-5 font-sans text-sm font-medium uppercase">
                Quick Links
              </h3>

              <div className="flex flex-col gap-3 font-sans text-sm text-[#A5A9A7]">
                <Link href="/">Home</Link>
                <Link href="/about">About Us</Link>
                <Link href="/contact">Contact</Link>
              </div>
            </div>

            <div>
              <h3 className="mb-5 font-sans text-sm font-medium uppercase">
                Resources
              </h3>

              <div className="flex flex-col gap-3 font-sans text-sm text-[#A5A9A7]">
                <Link href="/blog">Blog</Link>
                <Link href="/gallery">Gallery</Link>
              </div>
            </div>

            <div>
              <h3 className="mb-5 font-sans text-sm font-medium uppercase">
                Pages
              </h3>

              <div className="flex flex-col gap-3 font-sans text-sm text-[#A5A9A7]">
                <Link href="/shop">Shop</Link>
                <Link href="/collection">Collection</Link>
                {/* <Link href="/wishlist">History</Link> */}
                {/* <Link href="/privacy-policy">Favorites</Link> */}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t-[2px] border-[#765996] pt-6">
          <p className="font-sans text-xs text-[#A5A9A7]">
            © {new Date().getFullYear()} The Soibi Fashion. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
