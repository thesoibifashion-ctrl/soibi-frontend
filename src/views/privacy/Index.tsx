import HeroSection from "../collections/Hero";
import TermsAndConditionsPage from "./Privacy";

const PrivacyPolicy = () => {
  return (
    <div className="bg-[#EEEEEE]">
      <HeroSection
        title={"Privacy & Cookie Policy"}
        image={"/collection.jpg"}
      />
      <TermsAndConditionsPage />
    </div>
  );
};

export default PrivacyPolicy;
