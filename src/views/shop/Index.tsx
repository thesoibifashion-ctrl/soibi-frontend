import HeroSection from "../collections/Hero"
import FilterIndex from "./filter/Index"

const ShopPage = () => {
  return (
    <div>  <HeroSection
    title={"All Products"}
    text={
      "Each pieces, each made with intention."
    }
    image={"/collection.jpg"}
  /><FilterIndex/></div>
  )
}

export default ShopPage