import { Collection } from "@/api/features/collection";
import { ProductCard } from "@/components/shared/cards/ProductCard";
import Container from "@/components/shared/Container";
import { Product } from "@/types/Index";

interface Collections {
  collection: Collection;
}

const Products = (collection: Collections) => {
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
            onQuickView={() => {}}
          />
        ))}
      </div>
    
    </Container>
  );
};

export default Products;
