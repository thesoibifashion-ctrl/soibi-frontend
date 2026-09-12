import ErrorState from "@/components/shared/Error";

const NotFound = () => {
  return (
    <ErrorState
      title="Cart"
      text="Oops, i think we are lost"
      image="/empty-cart.png"
      route="/shop"
    />
  );
};

export default NotFound;
