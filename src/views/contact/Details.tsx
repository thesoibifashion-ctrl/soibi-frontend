import { AlarmClock, Mail, MapPin, Phone } from "lucide-react";

const Details = () => {
  return (
    <div className="lg:w-[40%]">
      <div className="hidden lg:block">
        <h2 className="font-medium text-[20px]">GET IN TOUCH </h2>
        <p className="text-black text-[64px] mt-9.25  leading-7.5">
          We’d love
        </p>
        <p className="text-[#7B3C10] text-[55px] mt-9.25 leading-7.5">
          to hear
        </p>
        <p className="text-black text-[64px] mt-9.25 leading-7.5">
          from you.
        </p>
      </div>
      <div className="mt-10 hidden lg:block lg:mt-22.5 space-y-8 lg:space-y-10">
        <div className="flex items-center gap-7.5">
          <MapPin color="black" size={20} />
          <p className="text-[18px] text-[#595959]">
            Rivers State, Port Harcourt
          </p>
        </div>
        <div className="flex items-center gap-7.5">
          <Mail color="black" size={20} />
          <p className="text-[18px] text-[#595959]">hello@soibifashion.com</p>
        </div>
        <div className="flex items-center gap-7.5">
          <Phone color="black" size={20} />
          <div>
            <p className="text-[18px] text-[#595959]">+234 905 075 8912</p>
            <p className="text-[18px] text-[#595959]">Mon-Fri, 9am-6pm WAT</p>
          </div>
        </div>
        <div className="flex items-center gap-7.5">
          <AlarmClock color="black" size={20} />
          <div>
            <p className="text-[18px] text-[#595959]">Open Monday-Friday</p>
            <p className="text-[18px] text-[#595959]">9am-6pm</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
