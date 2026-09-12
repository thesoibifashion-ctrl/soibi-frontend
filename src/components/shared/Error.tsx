import AnimatedButton from "./AnimatedButton";
import Container from "./Container";

interface Errors {
  title?: string;
  text?: string;
  image: string;
  route?: string;
  error?:string
}
const ErrorState = ({ title, text, image, route,error }: Errors) => {
  return (
    <Container className="h-screen mt-25">
      <p className="text-[50px] text-[black]">{title}</p>
      <div className="w-full flex flex-col justify-center items-center">
        <img className="max-h-95.25" src={image} />
        <p className="text-[32px] font-normal font-sans text-[#0D0D0D]">{error}</p>
        <p className="mt-12.5 text-lg text-black mb-3 w-95 text-center">
          {text}
        </p>
        {route && <AnimatedButton text="Shop now" route={route} />}
      </div>
    </Container>
  );
};

export default ErrorState;
