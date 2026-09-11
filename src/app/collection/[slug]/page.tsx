import ViewCollectionPage from "@/views/collections/view-collection/Index";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function page({ params }: PageProps) {
  const { slug } = await params;

  return <ViewCollectionPage slug={slug} />;
}