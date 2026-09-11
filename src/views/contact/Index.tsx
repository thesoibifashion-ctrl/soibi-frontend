import HeroSection from "../collections/Hero";
import Contacts from "./Contact";

const ContactPage = () => {
  return (
    <div className="bg-[#EEEEEE]">
      <HeroSection
        title={"Contact Us"}
        text={
          "Each pieces, each made with intention."
        }
        image={"/collection.jpg"}
      />
      <Contacts/>
    </div>
  );
};

export default ContactPage;
