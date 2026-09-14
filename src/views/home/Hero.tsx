// import AnimatedButton from "@/components/shared/AnimatedButton";
// import Container from "@/components/shared/Container";

// const Hero = () => {
//   return (
//     <div className="relative h-screen w-full overflow-hidden pb-12.5">
//       {/* Background Video */}
//       <video
//         autoPlay
//         muted
//         loop
//         playsInline
//         className="absolute inset-0 h-full w-full object-cover object-top"
//       >
//         <source src="/soibi.mp4" type="video/mp4" />
//       </video>

//       {/* Dark Overlay */}
//       <div className="absolute inset-0 bg-black/20" />

//       {/* Content */}
//       <div className="relative z-10 h-full">
//         <Container className="h-full">
//           <div className="flex h-full w-full items-end justify-end lg:w-201">
//             <div>
//               <p className="text-[36px] leading-11.25 text-white md:text-[96px] md:leading-25">
//                 A good outfit is a silent power move.
//               </p>

//               <div className="mt-8 flex w-full items-center gap-5 md:gap-13">
//                 <AnimatedButton
//                   text="Explore Collection"
//                   route="/collection"
//                   variant="black"
//                 />

//                 <AnimatedButton
//                   text="Shop Now"
//                   route="/shop"
//                   variant="white"
//                 />
//               </div>
//             </div>
//           </div>
//         </Container>
//       </div>
//     </div>
//   );
// };

// export default Hero;

import Image from "next/image";
import AnimatedButton from "@/components/shared/AnimatedButton";
import Container from "@/components/shared/Container";

interface HeroProps {
  imageUrl: string;
}

const Hero = ({ imageUrl }: HeroProps) => {
  return (
    <div className="relative h-screen w-full overflow-hidden pb-12.5">
      {imageUrl && (
        <Image
          src={imageUrl || `/hero.jpg`}
          alt="Hero"
          fill
          priority
          className="object-cover object-top"
        />
      )}

      <div className="relative z-10 h-full">
        <Container className="h-full">
          <div className="flex h-full w-full items-end justify-end lg:w-201">
            <div>
              <p className="text-[36px] leading-11.25 md:text-[96px] md:leading-25 text-white">
                A good outfit is a silent power move.
              </p>
              <div className="mt-8 flex w-full items-center gap-5 md:gap-13">
                <AnimatedButton
                  text="Explore Collection"
                  route="/collection"
                  variant="black"
                />
                <AnimatedButton
                  text="Shop Now"
                  route="/shop"
                  variant="white"
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Hero;
