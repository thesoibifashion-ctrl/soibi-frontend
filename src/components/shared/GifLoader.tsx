import { useEffect, useState } from "react";

const loadingSteps = [
  {
    gif: "/cut.gif",
    text: "Cutting your design...",
  },
  {
    gif: "/cloth.gif",
    text: "Preparing your material...",
  },
  // {
  //   gif: "/iron.gif",
  //   text: "Finishing the details...",
  // },
];

export default function LoadingAnimation() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((current) => (current + 1) % loadingSteps.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const currentStep = loadingSteps[step];

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <img
        src={currentStep.gif}
        alt=""
        className="h-50 rounded-lg object-contain"
      />

      <p className="text-sm text-black">
        {currentStep.text}
      </p>
    </div>
  );
}