"use client";

import { useSubmitContact } from "@/api/features/users";
import Container from "@/components/shared/Container";
import { useState } from "react";
import { toast } from "sonner";
import Details from "./Details";
import { AlarmClock, Mail, MapPin, Phone, SendHorizonal } from "lucide-react";
// import { useSubmitContact } from "@/hooks/useSubmitContacts";

const Contacts = () => {
  const { mutate: submitContact, isPending } = useSubmitContact();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!form.email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    if (!form.message.trim()) {
      toast.error("Please enter your message");
      return;
    }

    submitContact(
      {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        subject: form.subject.trim() || undefined,
        message: form.message.trim(),
      },
      {
        onSuccess: () => {
          toast.success("Message sent successfully");

          setForm({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
          });
        },

        onError: (error: any) => {
          console.error(error);
          toast.error(
            error?.message || "Failed to send message. Please try again."
          );
        },
      }
    );
  };

  return (
    <section>
      <Container>
        <div className="lg:flex my-10 gap-12 ">
          <div className="lg:hidden">
            <h2 className="font-medium text-[20px]">GET IN TOUCH </h2>
            <p className="text-black text-[40px] mt-9.25  leading-1.25">
              We’d love
            </p>
            <p className="text-[#7B3C10] text-[32px] mt-9.25 leading-1.25">
              to hear
            </p>
            <p className="text-black text-[40px] mt-9.25 leading-1.25">
              from you.
            </p>
          </div>
           <Details />
          <div className="lg:w-[60%] bg-white py-9.5 px-4 lg:px-12.5 rounded-[20px] mt-10 lg:mt-0 shadow-xl">
            <form onSubmit={handleSubmit}>
              <h2 className=" mb-8 text-[20px] lg:text-3xl font-bold text-near-black">
                Send Us A Message
              </h2>

              <div className="mb-4 grid gap-4 lg:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em]">
                    Full Name
                  </label>

                  <input
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-[#F3F3F6] px-5 py-4 text-sm outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em]">
                    Email Address
                  </label>

                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-[#F3F3F6] px-5 py-4 text-sm outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em]">
                  Phone / WhatsApp
                </label>

                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-[#F3F3F6] px-5 py-4 text-sm outline-none focus:border-gold"
                />
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em]">
                  Subject
                </label>

                <input
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-[#F3F3F6] px-5 py-4 text-sm outline-none focus:border-gold"
                />
              </div>

              <div className="mb-7">
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em]">
                  Message
                </label>

                <textarea
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full resize-none rounded-xl bg-[#F3F3F6] px-5 py-4 text-sm outline-none focus:border-gold"
                />
              </div>

              {/* <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-xl bg-gold py-5 text-xs font-bold uppercase tracking-[0.15em] text-near-black disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPending ? "Sending..." : "Send Message"}
              </button> */}
              {/* <AnimatedButton text={"Send Message"} route={""} /> */}
              <div className="w-full flex justify-center">
                <div className="w-76.5">
                  {" "}
                 
                  <button
                  className="flex items-center justify-center gap-2 bg-black text-white rounded-[50px] border px-6 py-4 font-sans text-sm font-medium  w-fit mx-auto "
                  >
                    {isPending ? "Sending..." : "Send Message"}
                    <SendHorizonal size={16} />

                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="lg:hidden">
          <div className="mt-10 lg:mt-22.5 space-y-8 lg:space-y-10">
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
        </div>
      </Container>
    </section>
  );
};

export default Contacts;
