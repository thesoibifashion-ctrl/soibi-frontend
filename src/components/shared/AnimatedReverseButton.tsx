import Link from "next/link";

interface ButtonProps {
  text: string;
  route: string;
  variant?: "black" | "white";
  textColor?:string
}

const AnimatedButton = ({ text, route, variant = "black",textColor= "white" }: ButtonProps) => {
  const isBlack = variant === "black";

  return (
    <Link
      href={route}
      className={`group w-full md:w-fit relative inline-flex items-center justify-center overflow-hidden rounded-[50px] border px-3 md:px-6 py-2 md:py-4 font-[var(--font-inter)] text-sm font-medium tracking-wide ${
        isBlack
          ? "border-none bg-white text-white"
          : "border-black bg-transparent text-white"
      }`}
    >
      <span
        className={`absolute h-0 w-0 rounded-full transition-all duration-500 ease-out group-hover:h-56 group-hover:w-56 ${
          isBlack ? "bg-black" : "bg-white"
        }`}
      />

      <span
        className={`relative z-10 transition-colors duration-300 ${
          isBlack
            ? "text-black group-hover:text-white"
            : "text-black group-hover:text-white"
        }`}
      >
        {text}
      </span>
    </Link>
  );
};

export default AnimatedButton;
