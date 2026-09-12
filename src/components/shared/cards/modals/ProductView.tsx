import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Product } from "@/types/Index";
import AnimatedButton from "../../AnimatedButton";
import DynamicPrice from "../../Prices";

interface QuickViewModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuickViewModal({
  product,
  open,
  onOpenChange,
}: QuickViewModalProps) {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="lg:max-w-[70vw]! max-h-[90vh]! lg:max-h-[80vh]! overflow-scroll p-0 gap-0!">
        <DialogHeader className="p-0!">
          <DialogTitle className="hidden" />
        </DialogHeader>

        <div className="grid h-[80vh] grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-13.25">
          <div className="h-full overflow-auto lg:overflow-hidden">
            <img
              src={product.images?.[0]?.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover object-top"
            />
          </div>

          <div className="h-full overflow-y-auto pr-6">
            <div className="flex min-h-full flex-col justify-between p-4 lg:p-8 lg:pt-20">
              <div>
                <p className="text-3xl lg:text-[65px] lg:leading-20 text-black">
                  {product.name}
                </p>

                <p className="mt-5 text-[13px] leading-7.5 text-black">
                  {product.description?.slice(0, 200) ||
                    "No description available."}
                </p>
              </div>

              <div className="mt-10 flex flex-col justify-center">
                <div className="flex w-full items-center justify-between border-t pt-2">
                  <p className="text-[15px] text-black">Price</p>

                  <p className="text-[15px] text-black">
                    <DynamicPrice prices={product.prices}/>
                  </p>
                </div>

                <div className="mx-auto mt-5">
                  <AnimatedButton
                    text="View Full Details"
                    route={`/shop/${product.slug}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}