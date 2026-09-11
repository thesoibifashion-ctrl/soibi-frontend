import { InstagramCarousel } from "@/components/shared/carousels/InstagramCarousel";
import About from "./About";
import Hero from "./Hero";


const images: string[] = [
  "/home1.jpg",
  "/home2.jpg",
  "/home3.jpg",
  "/home4.jpg",
  "/home-5.jpg",
  "/home-6.jpg",
  "/home-7.jpg",
  "/home-8.jpg",
  "/home-9.jpg"
    ]
const AboutPage = () => {
  
  return (
    <div>
      <Hero />
      <About />
      <InstagramCarousel images={images}/>
      
    </div>
  );
};

export default AboutPage;
