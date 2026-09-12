import { Collection } from "@/api/features/collection";
import { QuickViewModal } from "@/components/shared/cards/modals/ProductView";
import { ProductCard } from "@/components/shared/cards/ProductCard";
import Container from "@/components/shared/Container";
import { Product } from "@/types/Index";
import { useState } from "react";

interface Collections {
  collection: Collection;
}

const Products = (collection: Collections) => {
   const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
      null
    );
  return (
    <Container>
      <p className="  text-center mt-5">
       {collection.collection.description}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-8 mt-16">
        {collection.collection.products?.map((product: Product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={setQuickViewProduct}
          />
        ))}

              <QuickViewModal
                product={quickViewProduct}
                open={!!quickViewProduct}
                onOpenChange={(open) => !open && setQuickViewProduct(null)}
              />
      </div>
    
    </Container>
  );
};

export default Products;
