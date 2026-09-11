import Image from "next/image";

const ProductErrorState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <Image
        src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700&q=80"
        alt="Error"
        width={320}
        height={320}
        className="mb-8 h-60 w-60 rounded-2xl object-cover"
      />

      <span className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-red-500">
        Something Went Wrong
      </span>

      <h2 className="font-display text-3xl font-bold text-near-black">
        Unable to Load Products
      </h2>

      <p className="mt-4 max-w-md text-sm leading-7 text-[#777]">
        We couldn't load the products right now. Please check your internet
        connection or try again in a moment.
      </p>

      <button
        onClick={() => window.location.reload()}
        className="mt-8 rounded-xl bg-near-black px-8 py-3 text-xs font-bold uppercase tracking-[0.15em]  text-gold transition hover:opacity-90"
      >
        Try Again
      </button>
    </div>
  );
};

export default ProductErrorState;