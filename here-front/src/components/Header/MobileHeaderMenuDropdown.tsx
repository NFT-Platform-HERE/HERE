import { closeMobileHeaderMenuDropdown } from "@/stores/header/mobileHeaderMenuDropdown";
import { setMobileHeaderName } from "@/stores/header/mobileHeaderName";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

interface Iprops {
  handleConnect: () => void;
}

export default function MobileHeaderMenuDropdown({ handleConnect }: Iprops) {
  const router = useRouter();
  const dispatch = useDispatch();

  const movePage = (url: string) => {
    router.push(url);
    switch (url) {
      case "/":
        dispatch(setMobileHeaderName("home"));
        break;
      case "/donate":
        dispatch(setMobileHeaderName("기부해요"));
        break;
      case "/blood":
        dispatch(setMobileHeaderName("헌혈해요"));
        break;
      case "/submit":
        dispatch(setMobileHeaderName("제출해요"));
        break;
      case "/my-nft":
        dispatch(setMobileHeaderName("나의 NFT"));
        break;
      case "/signin":
        dispatch(setMobileHeaderName("로그인"));
        break;
      default:
        break;
    }
    dispatch(closeMobileHeaderMenuDropdown());
  };

  return (
    <div className=" flex h-270 flex-col justify-around bg-white pl-20 shadow-sm">
      <img
        src="/icons/logo.svg"
        className="h-29 w-60"
        onClick={() => movePage("/")}
      ></img>
      <div className="text-14" onClick={() => movePage("/donate")}>
        기부해요
      </div>
      <div className="text-14" onClick={() => movePage("/blood")}>
        헌혈해요
      </div>
      <div className="text-14" onClick={() => movePage("/submit")}>
        제출해요
      </div>
      <div className="text-14" onClick={() => movePage("/my-nft")}>
        나의 NFT
      </div>

      <div className="text-14" onClick={handleConnect}>
        LOGIN
      </div>
    </div>
  );
}
