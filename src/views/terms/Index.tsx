import HeroSection from "../collections/Hero";
import TermsAndConditionsPage from "./terms"

const TermsPage = () => {
  return (
    <div className="bg-[#EEEEEE]">
      <HeroSection
        title={"Terms & Conditions Of Sale And Use"}
        image={"/collection.jpg"}
      />
      <TermsAndConditionsPage />
    </div>
  );}

export default TermsPage