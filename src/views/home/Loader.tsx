import Image from "next/image";

const HomeLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F7F4EF]">
      {/* Sewing machine */}
      <div className="relative flex h-[180px] w-[180px] items-center justify-center">
        <div className="absolute inset-0 rounded-full   animate-pulse" />

        <Image
          src="/sewing.gif"
          alt="Crafting"
          className="rounded-full"
          width={130}
          height={130}
          unoptimized
        />
      </div>

      {/* Text */}
      <div className=" overflow-hidden text-center">
        <p className="font-poller animate-pulse text-3xl uppercase tracking-[0.2em] text-[black]">
          Crafting
        </p>

        <p className="mt-2 font-sans text-xs uppercase tracking-[0.4em] text-black/50">
          Something beautiful
        </p>
      </div>

      {/* Little loading line */}
      <div className="mt-8 h-[2px] w-32 overflow-hidden bg-black/10">
        <div className="h-full w-1/2 animate-loader-line bg-[black]" />
      </div>
    </div>
  );
};

export default HomeLoader;