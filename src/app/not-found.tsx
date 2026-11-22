import ErrorState from "@/components/shared/Error";
import { Suspense } from "react";

const NotFound = () => {
  return (
<Suspense fallback={null}>
<ErrorState
      title=""
      text="Oops, i think we are lost"
      image="/404.png"
      route="/"
      button="Back to home"
    />
</Suspense>
  );
};

export default NotFound;
