import { ReactNode } from "react";

interface AnimatedSubmitButtonProps {
  text: string;
  onClick?: () => void;
  icon?: ReactNode;
  variant?: "black" | "white";
  disabled?: boolean;
}

const AnimatedSubmitButton = ({
  text,
  onClick,
  icon,
  variant = "black",
  disabled = false,
}: AnimatedSubmitButtonProps) => {
  const isBlack = variant === "black";

  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled}
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-[50px] border px-6 py-4 text-sm font-medium tracking-wide w-full transition-all ${
        isBlack
          ? "border-none bg-black text-white"
          : "border-white bg-transparent text-white"
      } disabled:cursor-not-allowed disabled:opacity-50`}
    >
      {/* Expanding circle */}
      <span className="absolute h-0 w-0 rounded-full bg-white transition-all duration-500 ease-out group-hover:h-56 group-hover:w-56" />

      {/* Text + Icon */}
      <span
        className={`relative z-10 flex items-center gap-2 transition-colors duration-300 ${
          isBlack
            ? "text-white group-hover:text-black"
            : "text-white group-hover:text-black"
        }`}
      >
        {text}
        {icon && <span className="flex items-center">{icon}</span>}
      </span>
    </button>
  );
};

export default AnimatedSubmitButton;