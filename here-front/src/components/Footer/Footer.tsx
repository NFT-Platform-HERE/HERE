import { BsPerson } from "react-icons/bs";
import { RiVipCrownLine } from "react-icons/ri";

export default function Footer() {
  return (
    <div className="flex h-300 justify-center bg-[#f7f7f7]">
      <div className="w-600">
        <img src="images/logo.svg" className="mx-auto mt-100 w-200" />
      </div>
      <div className="w-600 px-30 py-50">
        <p>Copyright © 2현9해조</p>
        <p>SSAFY 8기 특화 프로젝트</p>
        <div className="mt-10 leading-30">
          <RiVipCrownLine className="mr-5 inline-block text-25" />
          <span>이현구</span>
        </div>
        <div className="mt-10 leading-30">
          <BsPerson className="mr-5 inline-block text-25" />
          <span>김도언 이경택 조용현 최규림 최정온</span>
        </div>
      </div>
    </div>
  );
}
