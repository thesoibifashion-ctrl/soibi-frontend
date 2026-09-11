const Note = () => {
  return (
    <section
      className="relative  py-4 md:py-15.5 mt-11.25 bg-cover bg-center"
      style={{ backgroundImage: "url('/notes.jpeg')" }}
    >
      <div className="absolute inset-0 bg-[#000000D6]" />

      <div className="relative z-10 text-center flex flex-col items-center">
        <p className="text-sm md:text-[20px] text-white">A Note From The Founder</p>
        <p className="text-[20px] md:text-[50px] w-[80%]  text-white mt-9">
          A garment isn’t finished when it’s sewn. It’s finished when someone
          wears it like it belongs to her
        </p>
        <p className="text-sm md:text-[20px] text-white mt-11">- Soibi Wikina, Founder</p>

      </div>
    </section>
  );
};

export default Note;
