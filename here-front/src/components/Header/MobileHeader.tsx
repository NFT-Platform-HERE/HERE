import { RootState } from "@/stores/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Background from "@/components/Background/Background";
import MobileHeaderMenuDropdown from "./MobileHeaderMenuDropdown";
import MobileHeaderProfileDropdown from "./MobileHeaderProfileDropdown";
import {
  closeMobileHeaderMenuDropdown,
  openMobileHeaderMenuDropdown,
} from "@/stores/header/mobileHeaderMenuDropdown";
import {
  closeMobileHeaderProfileDropdown,
  openMobileHeaderProfileDropdown,
} from "@/stores/header/mobileHeaderProfileDropdown";
import { useRouter } from "next/router";
import MobileHeaderName from "./MobileHeaderName";
import { FaWallet } from "react-icons/fa";

interface Iprops {
  handleConnect: () => void;
}

export default function MobileHeader({ handleConnect }: Iprops) {
  const menuDropdown = useSelector((state: RootState) => {
    return state.mobileHeaderMenuDropdown.isOpen;
  });
  const profileDropdown = useSelector((state: RootState) => {
    return state.mobileHeaderProfileDropdown.isOpen;
  });
  const headerName = useSelector((state: RootState) => {
    return state.mobileHeaderName.name;
  });

  const walletAddress = useSelector(
    (state: RootState) => state.member.walletAddress,
  );

  const dispatch = useDispatch();
  const router = useRouter();

  const handleMenuDropDown = () => {
    menuDropdown
      ? dispatch(closeMobileHeaderMenuDropdown())
      : dispatch(openMobileHeaderMenuDropdown());
    profileDropdown && dispatch(closeMobileHeaderProfileDropdown());
  };

  const handleProfileDropDown = () => {
    profileDropdown
      ? dispatch(closeMobileHeaderProfileDropdown())
      : dispatch(openMobileHeaderProfileDropdown());
    menuDropdown && dispatch(closeMobileHeaderMenuDropdown());
  };

  const handleBackgroundClick = () => {
    menuDropdown && dispatch(closeMobileHeaderMenuDropdown());
    profileDropdown && dispatch(closeMobileHeaderProfileDropdown());
  };

  return (
    <div>
      <div className="relative z-30 flex h-60 w-full min-w-300 items-center justify-between bg-white pr-10 pl-10">
        {!walletAddress ? (
          <button onClick={handleConnect}>
            <FaWallet className="mx-10 text-24 text-pen-3" />
          </button>
        ) : (
          <img
            src="/icons/character.svg"
            className="h-35 w-35"
            onClick={handleProfileDropDown}
          ></img>
        )}
        {headerName === "home" ? (
          <img src="/icons/logo.svg" className="h-40 w-80"></img>
        ) : (
          <MobileHeaderName name={headerName} />
        )}
        <img
          src="/icons/menu.svg"
          className="h-30 w-30"
          onClick={handleMenuDropDown}
        ></img>
        {profileDropdown && (
          <div className="absolute top-60 left-0 h-270 w-full">
            <MobileHeaderProfileDropdown />
          </div>
        )}
        {menuDropdown && (
          <div className="absolute top-60 right-0 h-270 w-full">
            <MobileHeaderMenuDropdown />
          </div>
        )}
      </div>
      {(profileDropdown || menuDropdown) && (
        <Background onClick={handleBackgroundClick}></Background>
      )}
    </div>
  );
}
