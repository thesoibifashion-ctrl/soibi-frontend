"use client";
import { useCustomizations } from "@/api/features/home";
import Container from "@/components/shared/Container";
import Image from "next/image";

// Escapes everything, then re-allows only <br/> and <br>
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
    isError: customizationsError,
  } = useCustomizations();

  const about = customizations?.find((item) => item.slug === "about-page");

  return (
    <Container className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-17.5 mt-8 lg:mt-22.25">
      <div className="hidden lg:flex relative w-full full">
        <Image
          src={about?.options[0].imageUrl || "/soibi-about.jpg"}
          alt="about"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div>
        <p className="font-black text-center">CEO And Creative Director</p>
        <p className="font-black text-[20px] lg:text-[32px] text-center mt-2">
          Soibi-Ilate Ebenezar Wikina
        </p>
        <div className="flex lg:hidden mt-10 relative w-full h-98.5">
        <Image
          src={about?.options[0].imageUrl || "/soibi-about.jpg"}
          alt="about"
          layout="fill"
          objectFit="cover"
        />
      </div>
        <div
          className="text-base text-justify mt-8 font-normal text-black leading-[40px]"
          dangerouslySetInnerHTML={{
            __html: sanitizeDescription(about?.options[0].description || ""),
          }}
        />
      </div>
    </Container>
  );
};

export default About;