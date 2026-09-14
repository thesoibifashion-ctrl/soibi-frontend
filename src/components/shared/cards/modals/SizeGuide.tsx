"use client";

import Modal from "./General";

interface SizeGuideModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedSize: number | string | null;
  onSizeSelect: (size: string) => void;
}

const sizeGuide = [
  {
    uk: 8,
    us: 4,
    bust: "34–35",
    waist: "27–28",
    hip: "38–39",
  },
  {
    uk: 10,
    us: 6,
    bust: "36–37",
    waist: "29–30",
    hip: "40–41",
  },
  {
    uk: 12,
    us: 8,
    bust: "38–39",
    waist: "31–32",
    hip: "42–43",
  },
  {
    uk: 14,
    us: 10,
    bust: "40–41",
    waist: "33–34",
    hip: "44–45",
  },
  {
    uk: 16,
    us: 12,
    bust: "42–43",
    waist: "35–36",
    hip: "46–47",
  },
  {
    uk: 18,
    us: 14,
    bust: "44–45",
    waist: "37–38",
    hip: "48–49",
  },
  {
    uk: 20,
    us: 16,
    bust: "46–47",
    waist: "39–40",
    hip: "50–51",
  },
  {
    uk: 22,
    us: 18,
    bust: "48–49",
    waist: "41–42",
    hip: "52–53",
  },
];

const SizeGuideModal = ({
  open,
  onOpenChange,
  selectedSize,
  onSizeSelect,
}: SizeGuideModalProps) => {
  const handleSelect = (ukSize: number) => {
    onSizeSelect(`UK ${ukSize}`);
    onOpenChange(false);
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title=""
      description=""
      className="max-w-[90vw]! lg:max-w-[80vw]!  p-8  lg:p-[72px] bg-[#EEEEEE]"
    >
      <div className="space-y-6">
        {/* Size selector */}
        {/* <div>
          <p className="mb-3 text-sm font-medium text-black">
            Select your size
          </p>

          <div className="flex flex-wrap gap-2">
            {sizeGuide.map((size) => {
              const isSelected = selectedSize === `UK ${size.uk}`;

              return (
                <button
                  key={size.uk}
                  type="button"
                  onClick={() => handleSelect(size.uk)}
                  className={`flex h-11 min-w-14 items-center justify-center rounded-md border px-4 text-sm transition-colors ${
                    isSelected
                      ? "border-black bg-black text-white"
                      : "border-black/20 bg-white text-black hover:border-black"
                  }`}
                >
                  UK {size.uk}
                </button>
              );
            })}
          </div>
        </div> */}

        {/* Size chart */}
        <p className="text-3xl lg:text-[50px] ">Size Chart</p>
       <div className="w-[75vw] overflow-auto">
       <div className="overflow-x-auto rounded-lg max-w-[90vw] lg:max-w-full border bg-white border-black/10">
          <table className="w-full min-w-[600px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-black/10 bg-[#F7F7F7]">
                <th className="px-4 py-4  text-left font-medium">
                  UK
                </th>

                <th className="px-4 py-4 text-left font-medium">
                  US
                </th>

                <th className="px-4 py-4 text-left font-medium">
                  Bust
                </th>

                <th className="px-4 py-4 text-left font-medium">
                  Waist
                </th>

                <th className="px-4 py-4 text-left font-medium">
                  Hip
                </th>
              </tr>
            </thead>

            <tbody>
              {sizeGuide.map((size) => {
                const isSelected = selectedSize === `UK ${size.uk}`;

                return (
                  <tr
                    key={size.uk}
                    className={`border-b border-black/5 transition-colors last:border-0 `}
                  >
                    {/* UK — selectable */}
                    <td className=" font-medium">
                      <button
                        type="button"
                        onClick={() => handleSelect(size.uk)}
                        className="w-full px-4 py-4 bg-[#F7F7F7] cursor-pointer w-fit text-left"
                      >
                        UK {size.uk}
                      </button>
                    </td>

                    {/* US — reference only */}
                    <td className="px-4 py-4 text-bold">
                      US {size.us}
                    </td>

                    <td className="px-4 py-4 text-[#4B5563]">
                      {size.bust}"
                    </td>

                    <td className="px-4 py-4 text-[#4B5563]">
                      {size.waist}"
                    </td>

                    <td className="px-4 py-4 text-[#4B5563]">
                      {size.hip}"
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
       </div>
        {/* ${
                      isSelected
                        ? "bg-black text-white"
                        : "hover:bg-black/[0.03]"
                    } */}
        {/* Information */}
        <div className="space-y-1 text-sm leading-6 ">
        <p className="text-base font-black"> Important!</p>
        <ul className="list-disc ml-5 italic">
           
            <li>
          Measurements are in inches.
          </li>

          <li>
          Each piece is produced in UK standard sizing. Please use the <br/> size guard above to determine your size.
          </li>

        </ul>
        </div>
        <div className="flex items-end justify-end w-full"><p className="italic">@thesoibi</p></div>
      </div>
    </Modal>
  );
};

export default SizeGuideModal;