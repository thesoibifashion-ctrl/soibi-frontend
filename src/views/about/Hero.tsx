import Container from "@/components/shared/Container";

const Hero = () => {
  return (
    <div className="relative py-10 w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: "url('/about.jpg')" }}
      />

      <div className="absolute inset-0 bg-[#000000D6]" />

      <Container className="relative z-10 pt-10">
        <div className="max-w-250 text-center mt-14.75 mx-auto">
          <p className="text-center text-[32px] text-white">About Us</p>
          <p className="text-center text-white text-base md:text-lg leading-10">
            SOIBI is a contemporary womenswear brand established in 2022 that
            creates timeless pieces for women who appreciate authenticity,
            elegance, craftsmanship, and ease. From elevated street style to
            occasion wear, every design reflects our signature blend of
            effortless elegance and relaxed sophistication. We create garments
            that carry meaning, pieces designed to remain relevant long after
            the season has passed.<br/><br/> At SOIBI, we are also passionate about
            preserving the richness of our heritage, presenting it through
            contemporary design in ways that resonate with the modern woman.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
