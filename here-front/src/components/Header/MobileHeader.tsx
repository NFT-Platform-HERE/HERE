import { useState } from "react";
import MobileHeaderMenuDropdown from "./MobileHeaderMenuDropdown";
import MobileHeaderProfileDropdown from "./MobileHeaderProfileDropdown";

export default function MobileHeader() {
  const [menuDropDown, setMenuDropDown] = useState<boolean>(false);
  const [profileDropDown, setProfileDropDown] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const handleMenuDropDown = () => {
    setMenuDropDown(!menuDropDown);
    setProfileDropDown(false);
  };

  const handleProfileDropDown = () => {
    setMenuDropDown(false);
    setProfileDropDown(!profileDropDown);
  };

  return (
    <div className="ml-10 flex h-60 w-[calc(100%-20px)] min-w-300 items-center justify-between">
      <img
        src="/icons/character.svg"
        className="h-35 w-35"
        onClick={handleProfileDropDown}
      ></img>
      <img src="/icons/logo.svg" className="h-40 w-80"></img>
      <img
        src="/icons/menu.svg"
        className="h-30 w-30"
        onClick={handleMenuDropDown}
      ></img>
      <div className="absolute top-60 left-0 h-270 w-full">
        {profileDropDown && <MobileHeaderProfileDropdown />}
      </div>
      <div className="absolute top-60 right-0 h-270 w-full">
        {menuDropDown && <MobileHeaderMenuDropdown />}
      </div>
    </div>
  );
}
