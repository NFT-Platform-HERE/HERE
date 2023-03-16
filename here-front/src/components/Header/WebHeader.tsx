import { useRouter } from "next/navigation";
import { useState } from "react";
import WebHeaderDropdown from "./WebHeaderDropdown";

export default function WebHeader() {
  const [dropDown, setDropDown] = useState<boolean>(false);

  const router = useRouter();

  const handleDropDown = () => {
    setDropDown(!dropDown);
  };

  return (
    <div className="justify-content min-w-900 flex h-65 w-full justify-center shadow-sm">
      <div className="relative flex h-65 w-[1200px] justify-between">
        <img
          src="/icons/logo.svg"
          className="cursor-pointer"
          onClick={() => router.push("/")}
        ></img>
        <div className="flex h-65 w-665 items-center justify-around text-18 font-medium">
          <div
            className="cursor-pointer"
            onClick={() => router.push("/donate")}
          >
            기부해요
          </div>
          <div className="cursor-pointer" onClick={() => router.push("/blood")}>
            헌혈해요
          </div>
          <div
            className="cursor-pointer"
            onClick={() => router.push("/submit")}
          >
            제출해요
          </div>
          <div
            className="cursor-pointer"
            onClick={() => router.push("/my-nft")}
          >
            나의 NFT
          </div>
        </div>
        <div
          className="flex w-120 cursor-pointer items-center"
          onClick={handleDropDown}
        >
          <img className="h-40 w-40 rounded-100 bg-slate-500"></img>
          <div className="ml-10 w-70 text-15 font-normal">이경택(님)</div>
        </div>
        {dropDown && (
          <div className="absolute top-[65px] right-0 z-10">
            <WebHeaderDropdown />
          </div>
        )}
      </div>
    </div>
  );
}
