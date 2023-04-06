import { closeMobileHeaderMenuDropdown } from "@/stores/header/mobileHeaderMenuDropdown";
import { setMobileHeaderName } from "@/stores/header/mobileHeaderName";
import { RootState } from "@/stores/store";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

export default function MobileHeaderMenuDropdown() {
  const { memberId } = useSelector((state: RootState) => state.member);
  const router = useRouter();
  const dispatch = useDispatch();

  const movePage = (url: string) => {
    if (!memberId) {
      window.alert("로그인이 필요한 서비스입니다");
      return;
    }
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
      case "/register":
        dispatch(setMobileHeaderName("종이 헌혈증 등록"));
        break;
      case "/information":
        dispatch(setMobileHeaderName("사용 가이드"));
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
      <div className="text-14" onClick={() => movePage("/register")}>
        종이 헌혈증 등록
      </div>
      <div className="text-14" onClick={() => movePage("/information")}>
        사용 가이드
      </div>
    </div>
  );
}
