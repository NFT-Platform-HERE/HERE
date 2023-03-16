import MobileHeader from "./MobileHeader";
import WebHeader from "./WebHeader";

export default function Header() {
  return (
    <div>
      <div className="mobile:hidden">
        <WebHeader />
      </div>
      <div className="hidden mobile:block">
        <MobileHeader />
      </div>
    </div>
  );
}
