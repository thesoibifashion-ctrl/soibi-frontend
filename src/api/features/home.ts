
import { useQuery } from "@tanstack/react-query";
import { publicApiGet } from "../requests/public";
import { Carousel, CustomizationCategory } from "@/types/Index";

export const getCustomizations = () =>
  publicApiGet<CustomizationCategory[]>("/api/customizations");

export const getCarousel = () => publicApiGet<Carousel[]>("/api/home/carousel");

export function useCustomizations() {
  return useQuery({
    queryKey: ["customizations"],
    queryFn: getCustomizations,
  });
}

export function useCarousel() {
  return useQuery({
    queryKey: ["home-carousel"],
    queryFn: getCarousel,
  });
}
