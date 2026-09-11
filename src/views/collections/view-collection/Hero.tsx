import { Collection } from "@/api/features/collection";
import Container from "@/components/shared/Container";
import Image from "next/image";
interface Collections {
  collection: Collection;
}
const Hero = ({collection} : Collections) => {
  return (
        <div className="relative h-screen w-full overflow-hidden pb-12.5">
          {/* Hero image */}
          {collection.imageUrl && (
            <Image
              src={collection.imageUrl}
              alt="Hero"
              fill
              priority
              className="object-cover object-top"
            />
          )}
    
          <div className="relative h-full">
            <Container className="h-full flex items-end">
              <p className="font-black text-[32px] md:text-[96px]">{collection.name}</p>
            </Container>
          </div>
        </div>
  )
}

export default Hero