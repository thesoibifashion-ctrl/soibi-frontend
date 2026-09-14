import { useCustomizations } from "@/api/features/home";
import Container from "@/components/shared/Container";


const Heritage = () => {
  const {
    data: customizations,
    // isLoading: customizationsLoading,
    // isError: customizationsError,
  } = useCustomizations();

  const brand = customizations?.find((item) => item.slug === "brand-values");

  return (
    <div className="bg-black mt-8 py-16.75 text-white">
      <Container className="flex-col lg:flex-row space-y-10 md:space-y-0 gap-5 lg:gap-0 flex justify-between items-center">
        {brand?.options.map((item) => (
          <div
            className="flex flex-col justify-center items-center "
            key={item.id}
          >
            <hr className="h-0.5 w-11.25 bg-white" />
            <p className=" font-medium font-poller mt-2 text-sm md:text-base">
              {item.name}
            </p>{" "}
            <p>{item.description}</p>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default Heritage;
