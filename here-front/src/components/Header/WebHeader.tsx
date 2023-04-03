import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import WebHeaderDropdown from "./WebHeaderDropdown";
import HeaderTag from "../Tag/HeaderTag";
import { FaWallet } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { useDispatch } from "react-redux";
import {
  closeWebHeaderDropdown,
  openWebHeaderDropdown,
} from "@/stores/header/webHeaderDropdown";
import AOS from "aos";
import "aos/dist/aos.css";

interface Iprops {
  handleConnect: () => void;
}

export default function WebHeader({ handleConnect }: Iprops) {
  const { memberId, nickname, characterImgUrl } = useSelector(
    (state: RootState) => state.member,
  );
  const dropDown = useSelector((state: RootState) => {
    return state.webHeaderDropdown.isOpen;
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const movePage = (path: string) => {
    router.push(path);
    dispatch(closeWebHeaderDropdown());
  };

  const handleDropDown = () => {
    dropDown
      ? dispatch(closeWebHeaderDropdown())
      : dispatch(openWebHeaderDropdown());
  };

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    dispatch(closeWebHeaderDropdown());
    setIsDisabled(
      !(
        router.asPath !== "/organization" &&
        router.asPath !== "/redcross" &&
        router.asPath !== "/redcross/publish"
      ),
    );
  }, []);

  return isDisabled ? null : (
    <div className="justify-content flex h-65 w-full  min-w-[1200px] justify-center shadow-sm">
      <div className="relative flex h-65 w-[1200px] justify-between">
        <img
          src="/icons/logo.svg"
          className="cursor-pointer"
          onClick={() => movePage("/")}
        ></img>
        <div className="flex h-65 w-665 items-center justify-around text-18 font-medium">
          <div
            className="group relative cursor-pointer"
            onClick={() => movePage("/donate")}
          >
            기부해요
            <div className="absolute -left-35 z-2 hidden group-hover:block">
              <HeaderTag>#헌혈증서 #나눔</HeaderTag>
            </div>
          </div>
          <div
            className="group relative cursor-pointer"
            onClick={() => movePage("/blood")}
          >
            헌혈해요
            <div className="absolute -left-35 z-2 hidden group-hover:block">
              <HeaderTag>#나의헌혈정보</HeaderTag>
            </div>
          </div>
          <div
            className="group relative cursor-pointer"
            onClick={() => movePage("/submit")}
          >
            제출해요
            <div className="absolute -left-35 z-2 hidden group-hover:block">
              <HeaderTag>#병원 #기관</HeaderTag>
            </div>
          </div>
          <div
            className="group relative cursor-pointer"
            onClick={() => movePage("/my-nft")}
          >
            나의 NFT
            <div className="absolute -left-35 z-2 hidden group-hover:block">
              <HeaderTag>#SNS #등록</HeaderTag>
            </div>
          </div>
        </div>
        {!memberId ? (
          <button onClick={handleConnect}>
            <FaWallet className="text-30 text-pen-3" />
          </button>
        ) : (
          <div
            className="flex w-120 cursor-pointer items-center"
            onClick={handleDropDown}
          >
            <img src={characterImgUrl} className="h-40 w-40 rounded-full" />
            <div className="ml-10 w-70 text-15 font-normal">{nickname}</div>
          </div>
        )}
        {dropDown && (
          <div
            className="absolute top-[65px] right-0 z-40"
            data-aos="fade-down"
            data-aos-duration="500"
          >
            <WebHeaderDropdown />
          </div>
        )}
      </div>
    </div>
  );
}
