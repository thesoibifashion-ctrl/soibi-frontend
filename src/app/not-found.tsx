import ErrorState from "@/components/shared/Error";

const NotFound = () => {
  return (
    <ErrorState
      title=""
      text="Oops, i think we are lost"
      image="/404.png"
      route="/"
      button="Back to home"
    />
  );
};

export default NotFound;
