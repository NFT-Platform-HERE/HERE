import MobileHeader from "./MobileHeader";
import WebHeader from "./WebHeader";

export default function Header() {
  return (
    <div className="relative z-30">
      <div className="bg-white mobile:hidden">
        <WebHeader />
      </div>
      <div className="hidden mobile:block">
        <MobileHeader />
      </div>
    </div>
  );
}
