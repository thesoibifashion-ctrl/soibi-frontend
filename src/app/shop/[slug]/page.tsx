import ViewCollectionPage from "@/views/collections/view-collection/Index";
import ViewProductPage from "@/views/shop/view-product/Index";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function page({ params }: PageProps) {
  const { slug } = await params;

  return <ViewProductPage slug={slug} />;
}