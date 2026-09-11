export type CustomizationStatus = "active" | "inactive";
  
export interface CustomizationOption {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  imagePublicId: string | null;
  description: string | null;
  status: CustomizationStatus;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface CustomizationCategory {
  id: string;
  name: string;
  slug: string;
  status: CustomizationStatus;
  sortOrder: number;
  options: CustomizationOption[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateCustomizationCategoryPayload {
  name: string;
  slug: string;
  status?: CustomizationStatus;
  sortOrder?: number;
}

export interface UpdateCustomizationCategoryPayload {
  name?: string;
  slug?: string;
  status?: CustomizationStatus;
  sortOrder?: number;
}

export interface CreateCustomizationOptionPayload {
  categoryId?: string;
  name: string;
  slug: string;
  imageUrl?: string | null;
  imagePublicId?: string | null;
  description?: string | null;
  status?: CustomizationStatus;
  sortOrder?: number;
}

export interface UpdateCustomizationOptionPayload {
  categoryId?:string,
  name?: string;
  slug?: string;
  imageUrl?: string | null;
  imagePublicId?: string | null;
  description?: string | null;
  status?: CustomizationStatus;
  sortOrder?: number;
}

export interface Carousel {
  id: string;
  imageUrl: string;
  imagePublicId: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCarouselPayload {
  imageUrl: string;
  imagePublicId: string;
  sortOrder?: number;
  isActive?: boolean;
}

export interface UpdateCarouselPayload {
  imageUrl?: string;
  imagePublicId?: string;
  sortOrder?: number;
  isActive?: boolean;
}


export interface Favorite {
  id: string;
  productId: string;
  createdAt: string;
  product: Product;
}
export interface FavoritesResponse {
  success: boolean;
  message: string;
  data: Favorite[];
}


export interface Product {
  id?: string;
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  prices?: ProductPriceResponse[];
  measurements?: ProductMeasurement[];
  sortOrder?:number;
  basePrice?: number;
  salePrice?: number | null;
isHero?: boolean;
sizes?: number[];
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isCustomizable?: boolean;
  gender?: "male" | "female" | "unisex";
  status?: "published" | "draft";
  images?: ProductImage[];
  collections?: Collection[];
  variants?: ProductVariant[];
  category:string;
  materials?: {
    id?: string;
    name: string;
    slug?:string
  }[];

  colors: {
    id: string;
    name: string;
    hex?: string;
    hexCode?:string;
  }[];

  createdAt?: string;
  updatedAt?: string;
}

export interface Measurement {
  id: string;
  title: string;
  imageUrl: string;
}

export interface ProductMeasurement {
  id?: string;
  measurementId: string;
  title?: string;
  value: string;
  imageUrl?: string;
  sortOrder: number;
}

export interface ProductPrice {
  currencyId: string;
  amount: number;
}

export interface ProductPriceResponse {
  currencyId: string;
  currency: string;
  name: string;
  title?:string
  id?:string;
  code?:string
  symbol: string;
  amount: number;
}

export interface Currency {
  id: string;
  code: string;
  name: string;
  symbol: string;
  isDefault: boolean;
  isActive: boolean;
}
export interface ProductPrice {
  currencyId: string;
  amount: number;
}

export interface ProductPriceResponse {
  currencyId: string;
  currency: string;
  name: string;
  symbol: string;
  amount: number;
}

export interface ProductImage {
  id: string;
  imageUrl: string;
  imagePublicId?: string | null;
  altText?: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface ProductVariant {
  id?: string;
  sizeLabel?: string;
  sizeValue?: number;
  sku?: string;
  priceAdjustment?: number;
  color?: Color;
  colorId?:string
  isAvailable?: boolean;
  sortOrder?: number;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string | null;
  status: "published" | "draft";
  sortOrder: number;
  productCount: number;
  isFeatured: boolean;
}
export interface Material {
  id: string;
  name: string;
  slug: string;
}

export interface Color {
  id: string;
  name: string;
  hexCode: string;
}
