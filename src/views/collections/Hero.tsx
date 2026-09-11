import Container from "@/components/shared/Container";
import ScrollTypewriter from "@/components/shared/Typewriter";

interface HeroProps {
    title: string;
    text: string;
    image: string;
  }
  
  const HeroSection = ({ title, text, image }: HeroProps) => {
    return (
      <section
        className="relative flex min-h-87.5 items-end overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#0000004D]" />
  
        {/* Content */}
        <Container className="relative z-10 pb-10  text-white">
       
          <ScrollTypewriter  text={title} className="text-[28px] md:text-[50px]"/>
  
          <p className="mt-2.75 w-80.75  text-base md:text-lg">
            {text}
          </p>
        </Container>
      </section>
    );
  };
  
  export default HeroSection;