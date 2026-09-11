import { Product, ProductPriceResponse } from "@/types/Index";
import { publicApiGet } from "../requests/public";
import { useQuery } from "@tanstack/react-query";



export const getProducts = () => {
  return publicApiGet<Product[]>("/api/products");
};
export const getFilteredProducts = (endpoint:string) => {
  return publicApiGet<Product[]>(endpoint);
};

export const getProductsBySlug = (slug: string) => {
  return publicApiGet<Product>(`/api/products/${slug}`);
};
export const getCurrencies = () => {
  return publicApiGet<ProductPriceResponse[]>(`/api/currencies`);
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};

export const useFilterProducts = (endpoint: string) => {
  return useQuery({
    queryKey: ["filter-products", endpoint],
    queryFn: () => getFilteredProducts(endpoint),
  });
};

export const useProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["products-slug", slug],
    queryFn: () => getProductsBySlug(slug),
    enabled: !!slug,
  });
};

export const useCurrencies = () => {
  return useQuery({
    queryKey: ["products-currencies"],
    queryFn:  getCurrencies,
   
  });
};

