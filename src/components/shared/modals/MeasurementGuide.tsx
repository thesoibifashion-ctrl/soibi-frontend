"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ProductMeasurement } from "@/types/Index";
import { Check } from "lucide-react";

interface MeasurementGuideModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  measurements:ProductMeasurement[];
  measurementValues: Record<string, string>;
  handleMeasurementChange: (title: string, value: string) => void;
  classes?:string
}

const tips = [
  {
    id: 1,
    tip: "Measure with clothes on",
  },
  {
    id: 2,
    tip: "Use inches only",
  },
  {
    id: 3,
    tip: "Keep tape relaxed",
  },
  {
    id: 4,
    tip: "Repeat twice.",
  },
];

const MeasurementGuideModal = ({
  open,
  onOpenChange,
  measurements,
  measurementValues,
  handleMeasurementChange,
  classes = "max-w-[80vw]! lg:max-w-[50vw]!"
}: MeasurementGuideModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`max-h-[85vh] bg-[#EEEEEE] px-[50px] overflow-y-auto ${classes && classes}`}>
        <DialogHeader className="mt-[70px]">
          <DialogTitle className="text-center text-[50px] leading-[40px]">
            Take Your measurement
          </DialogTitle>
        </DialogHeader>

        <p className="text-[15px] font-normal text-black text-center">
          Please all measurements should be taken in inches and not
          centimeters (cm)
        </p>

        <div className="bg-black px-8 py-3 mt-3 rounded-[20px]">
          <p className="text-white text-[20px]">Measurement Tips</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-3">
            {tips.map((item) => (
              <div key={item.id}>
                <p className="text-white font-sans text-[15px] flex gap-2 items-start">
                  <span className="pt-1">
                    <Check color="#D4AF37" />
                  </span>
                  {item.tip}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid-cols-2 grid gap-5 bg-white rounded-[20px] p-6">
          {measurements.map((m, idx) => (
            <div key={m.title} className="">
              <div>
                <div className="flex items-center gap-1 ">
                  <p className="bg-black font-sans font-bold rounded-full px-3 py-[10px] flex justify-center text-white w-fit">
                    0{idx + 1}
                  </p>

                  <p className="font-medium">{m.title}</p>
                </div>

                {m.imageUrl && (
                  <img
                    src={m.imageUrl}
                    alt={m.title}
                    className="w-full mt-5 h-[261px] rounded-md border"
                  />
                )}

                <p className="text-[15px] text-black mt-8">
                  {m.value}
                </p>

                <div className="mt-4">
                  <label className="font-sans text-[#374151] font-semibold">
                    Enter Your {m.title}
                  </label>

                  <Input
                    value={measurementValues[m.title || "bust"] ?? ""}
                    onChange={(e) =>
                      handleMeasurementChange(
                        m.title || "bust  ",
                        e.target.value
                      )
                    }
                    className="h-[45px] bg-[#F9FAFB] rounded-[16px] border border-[#E5E7EB] mt-2"
                    placeholder={`Enter your ${m.title}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeasurementGuideModal;
