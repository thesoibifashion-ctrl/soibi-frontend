
// import Image from "next/image";
// import AnimatedButton from "@/components/shared/AnimatedButton";
// import Container from "@/components/shared/Container";

// interface HeroProps {
//   imageUrl: string;
// }

// const Hero = ({ imageUrl }: HeroProps) => {
//   return (
//     <div className="relative h-screen w-full overflow-hidden pb-12.5">
//       {/* Image for laptop */}
//       {imageUrl && (
//         <Image
//           src={imageUrl || `/hero.jpg`}
//           alt="Hero"
//           fill
//           priority
//           className="hidden object-cover object-top lg:block"
//         />
//       )}

//       {/* Video for mobile and tablet */}
//       <video
//         src="/soibif.mp4"
//         autoPlay
//         loop
//         controls={false}
//         muted
//         aria-hidden="true"
//         playsInline
//         preload="auto"
//         className="absolute inset-0 h-full w-full object-cover object-top lg:hidden"
//       />

// <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent lg:hidden" />      
// <div className="relative z-10 h-full">
//         <Container className="h-full">
//           <div className="flex h-full w-full items-end justify-end lg:w-201">
//             <div>
//               <p className="text-[36px] leading-11.25 md:text-[96px] md:leading-25 text-white">
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
  desktopUrl?: string | null;
  mobileUrl?: string | null;
  text?:string|null
}

const VIDEO_EXT = /\.(mp4|webm|mov|m4v|ogg)(\?.*)?$/i;

const isVideoUrl = (url: string) =>
  VIDEO_EXT.test(url) || url.includes("/video/upload/");

const Hero = ({ desktopUrl, mobileUrl,text }: HeroProps) => {
  const desktopSrc = desktopUrl || "/hero.jpg";
  const mobileSrc = mobileUrl || "/soibif.mp4";

  return (
    <div className="relative h-screen w-full overflow-hidden pb-12.5">
      {/* Media for laptop */}
      {isVideoUrl(desktopSrc) ? (
        <video
          src={desktopSrc}
          autoPlay
          loop
          controls={false}
          muted
          aria-hidden="true"
          playsInline
          preload="auto"
          className="absolute inset-0 hidden h-full w-full object-cover object-top lg:block"
        />
      ) : (
        <Image
          src={desktopSrc}
          alt="Hero"
          fill
          priority
          className="hidden object-cover object-top lg:block"
        />
      )}

      {/* Media for mobile and tablet */}
      {isVideoUrl(mobileSrc) ? (
        <video
          src={mobileSrc}
          autoPlay
          loop
          controls={false}
          muted
          aria-hidden="true"
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover object-top lg:hidden"
        />
      ) : (
        <Image
          src={mobileSrc}
          alt="Hero"
          fill
          priority
          className="object-cover object-top lg:hidden"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent lg:hidden" />
      <div className="relative z-10 h-full">
  <Container className="flex h-full items-end">
    <div className="w-full lg:w-201">
      <p
        className="text-[36px] leading-11.25 text-white md:text-[96px] md:leading-25"
        dangerouslySetInnerHTML={{ __html: text || "" }}
      />
      <div className="mt-8 flex flex-col lg:flex-row w-full items-center gap-3 md:gap-13">
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
  </Container>
</div>
    </div>
  );
};
export default Hero;