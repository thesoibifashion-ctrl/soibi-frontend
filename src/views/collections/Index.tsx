"use client";
import { getCollections, useCollections } from "@/api/features/collection";
import HeroSection from "./Hero";
import FeaturedCollection from "./FeaturedCollection";
import Note from "./Note";
import OtherCollection from "./OtherCollection";
import LoadingAnimation from "@/components/shared/GifLoader";
import CurrencyPicker from "@/components/shared/CurrencyPicker";

const CollectionPage = () => {
  const {
    data: collection,
    isLoading: collectionLoading,
    isError: collectionError,
  } = useCollections();
  return (
    <div className=" bg-[#EEEEEE] min-h-screen">
      <HeroSection
        title={"Our Collections"}
        text={
          "Each collection is a chapter in the Soibi story, distinct, yet woven from the same thread."
        }
        image={"/collection.jpg"}
      />
      {collectionLoading ? (
        <LoadingAnimation />
      ) : (
        <>
          {" "}
          {collection && collection?.length > 0 && (
            <FeaturedCollection collection={collection ?? []} />
          )}
         {collection && collection?.length > 0 && (
            <OtherCollection collection={collection ?? []} />
          )} 
          <CurrencyPicker />
        </>
      )}
    </div>
  );
};

export default CollectionPage;
