import Logo from "../assets/Logo.png";

type LogoComponentProps = {
  className?: string;
};
export default function LogoComponent({ className = "" }: LogoComponentProps) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
        <img src={Logo} alt="" />
      </div>
      <span className="text-gray-800 font-semibold">SIMS PPOB</span>
    </div>
  );
}
