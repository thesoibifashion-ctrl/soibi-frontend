"use client";
import { useCustomizations } from "@/api/features/home";
import Container from "@/components/shared/Container";
import Image from "next/image";

function sanitizeDescription(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/&lt;br\s*\/?&gt;/gi, "<br/>");
}

const About = () => {
  const {
    data: customizations,
    isLoading: customizationsLoading,
  } = useCustomizations();

  const about = customizations?.find((item) => item.slug === "about-page");

  if (customizationsLoading) {
    return (
      <Container className="mt-8 grid animate-pulse grid-cols-1 gap-10 lg:mt-22.25 lg:grid-cols-2 lg:gap-17.5">
        <div className="hidden h-150 bg-[#F0ECE7] lg:block" />
        <div>
          <div className="mx-auto h-5 w-48 rounded bg-[#F0ECE7]" />
          <div className="mx-auto mt-4 h-9 w-72 max-w-full rounded bg-[#F0ECE7]" />
          <div className="mt-10 h-98.5 bg-[#F0ECE7] lg:hidden" />
          <div className="mt-8 space-y-4">
            <div className="h-4 w-full rounded bg-[#F0ECE7]" />
            <div className="h-4 w-full rounded bg-[#F0ECE7]" />
            <div className="h-4 w-5/6 rounded bg-[#F0ECE7]" />
            <div className="h-4 w-full rounded bg-[#F0ECE7]" />
            <div className="h-4 w-4/5 rounded bg-[#F0ECE7]" />
            <div className="h-4 w-full rounded bg-[#F0ECE7]" />
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-8 grid grid-cols-1 gap-10 lg:mt-22.25 lg:grid-cols-2 lg:gap-17.5">
      <div className="relative hidden min-h-[600px] lg:block">
        <Image
          src={about?.options?.[0]?.imageUrl || "/soibi-about.jpg"}
          alt="about"
          fill
          className="object-cover object-top"
        />
      </div>

      <div>
        <p className="text-center font-black">CEO And Creative Director</p>
        <p className="mt-2 text-center text-[20px] font-black lg:text-[32px]">
          Soibi-Ilate Ebenezar Wikina
        </p>

        <div className="relative mt-10 flex h-98.5 w-full lg:hidden">
          <Image
            src={about?.options?.[0]?.imageUrl || "/soibi-about.jpg"}
            alt="about"
            fill
            className="object-cover object-top"
          />
        </div>

        <div
          className="mt-8 text-justify text-base font-normal leading-10 text-black"
          dangerouslySetInnerHTML={{
            __html: sanitizeDescription(
              about?.options?.[0]?.description ||
                `SOIBI was founded by Soibi-ilate Wikina, whose love for fashion is rooted in a deep appreciation for femininity and ease. Her approach to design is guided by a desire to create beautifully considered pieces that take the complexity out of getting dressed, allowing women to feel polished without having to overthink what goes with what.

She believes fashion should make dressing up feel exciting and effortless. Whether for a quiet afternoon or a special occasion, SOIBI pieces are designed to stand on their own, complete, stylish looks that make a statement without requiring the woman to do the work of figuring out how to style them.

Her perspective shapes SOIBI’s designs, from coordinated sets to dresses and jumpsuits, each created to offer femininity, ease, and presence. The result is clothing that feels effortless to wear, yet impossible to overlook`
            ),
          }}
        />
      </div>
    </Container>
  );
};

export default About;