import AnimatedButton from "./AnimatedButton";
import Container from "./Container";

interface Errors {
  title?: string;
  text?: string;
  image: string;
  route?: string;
  error?:string
  button?:string
}
const ErrorState = ({ title, text, image, route,error,button= "Shop now" }: Errors) => {
  return (
    <Container className="h-screen mt-25">
      <p className="text-[50px] text-[black]">{title}</p>
      <div className="w-full flex flex-col justify-center items-center">
        <img className="max-h-34 lg:max-h-95.25 mt-8 lg:mt-0" src={image} />
        <p className="text-[32px] font-normal font-sans text-[#0D0D0D]">{error}</p>
        <p className="mt-12.5 text-lg text-black mb-3 w-95 text-center">
          {text}
        </p>
        {route && <AnimatedButton text={button} route={route} />}
      </div>
    </Container>
  );
};

export default ErrorState;
