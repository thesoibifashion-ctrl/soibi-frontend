import HeroSection from "../collections/Hero"
import Gallery from "./Gallery"

const GalleryPage = () => {
  return (
    <div>
         <HeroSection
        title={"Visual World"}
        text={
          "Gallery"
        }
        image={"/gallery.jpg"}
      />
      <Gallery/>
    </div>
  )
}

export default GalleryPage