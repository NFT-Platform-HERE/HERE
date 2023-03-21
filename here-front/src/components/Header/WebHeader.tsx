import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import WebHeaderDropdown from "./WebHeaderDropdown";
import HeaderTag from "../Tag/HeaderTag";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import useCheckMemberQuery from "@/hooks/member/useCheckMemberQuery";

export default function WebHeader() {
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const router = useRouter();

  const {
    connector,
    library,
    chainId,
    account,
    active,
    error,
    activate,
    deactivate,
  } = useWeb3React();

  const Injected = new InjectedConnector({});
  const handleConnect = () => {
    if ((window as any).ethereum === undefined) {
      // 지갑이 설치 안되어있으면 설치 페이지를 오픈한다. 일단 메타마스크만.
      window.open(
        `https://metamask.app.link/dapp/${window.location.host}`,
        "_blank",
      );
      return;
    }
    if (active && account) {
      deactivate();
      // 이미 연결되어있는 상태면 연결해제 함수 호출
    }
    activate(Injected);
    // activate 함수로, App에서 만든 Injected란 이름의 connector 인스턴스를 넘겨준다
  };

  const [walletAddress, setWalletAddress] = useState<string>("");
  const isMember = useCheckMemberQuery(walletAddress);
  console.log(isMember);

  useEffect(() => {
    if (account) {
      setWalletAddress(account);
    }
  }, [account]);

  const movePage = (path: string) => {
    router.push(path);
    setDropDown(false);
  };

  const handleDropDown = () => {
    setDropDown(!dropDown);
  };

  useEffect(() => {
    setIsDisabled(
      !(router.asPath !== "/organization" && router.asPath !== "/redcross"),
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
            <div className="absolute -left-35 hidden group-hover:block">
              <HeaderTag>#헌혈증서 #나눔</HeaderTag>
            </div>
          </div>
          <div
            className="group relative cursor-pointer"
            onClick={() => movePage("/blood")}
          >
            헌혈해요
            <div className="absolute -left-35 hidden group-hover:block">
              <HeaderTag>#나의헌혈정보</HeaderTag>
            </div>
          </div>
          <div
            className="group relative cursor-pointer"
            onClick={() => movePage("/submit")}
          >
            제출해요
            <div className="absolute -left-35 hidden group-hover:block">
              <HeaderTag>#병원 #기관</HeaderTag>
            </div>
          </div>
          <div
            className="group relative cursor-pointer"
            onClick={() => movePage("/my-nft")}
          >
            나의 NFT
            <div className="absolute -left-35 hidden group-hover:block">
              <HeaderTag>#SNS #등록</HeaderTag>
            </div>
          </div>
        </div>
        <button onClick={handleConnect}>{active ? "LOGOUT" : "LOGIN"}</button>
        {active ? (
          <div
            className="flex w-120 cursor-pointer items-center"
            onClick={handleDropDown}
          >
            <img className="h-40 w-40 rounded-100 bg-slate-500"></img>
            <div className="ml-10 w-70 text-15 font-normal">
              지갑 주소: {account}
            </div>
          </div>
        ) : null}
        {/* <div
          className="flex w-120 cursor-pointer items-center"
          onClick={handleDropDown}
        >
          <img className="h-40 w-40 rounded-100 bg-slate-500"></img>
          <div className="ml-10 w-70 text-15 font-normal">지갑 주소: {account}</div>
        </div> */}
        {dropDown && (
          <div className="absolute top-[65px] right-0 z-10">
            <WebHeaderDropdown />
          </div>
        )}
      </div>
    </div>
  );
}
