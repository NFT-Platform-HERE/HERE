import { useState } from "react";

export default function QrCodeReader() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      {isOpen ? (
        <div className="fixed top-[calc(50%-150px)] left-0 z-30 flex h-300 w-350 overflow-hidden rounded-r-20 border-t-4 border-r-4 border-b-4 border-red-2 bg-white">
          <div
            className="flex h-300 w-50 cursor-pointer items-center justify-center"
            onClick={() => setIsOpen(false)}
          >
            <img src="/icons/left-red-vector.svg" className="h-30 w-30"></img>
          </div>
          <div className="flex h-300 w-300 flex-col items-center justify-center">
            <div className="mb-10 w-210 text-center text-22 font-medium text-red-2">
              종이 헌혈증을 NFT로 등록할 수 있습니다.
            </div>
            <img
              src="/icons/qrcode.jpg"
              className="h-160 w-160 object-scale-down"
            ></img>
          </div>
        </div>
      ) : (
        <div
          className="group fixed top-[calc(50%-150px)] left-0 z-30 flex h-250 w-53 cursor-pointer items-center justify-center  rounded-r-40 border-t-4 border-r-4 border-b-4 border-red-2 bg-white"
          onClick={() => setIsOpen(true)}
        >
          <div className="w-25 text-center text-18 font-semibold text-red-2">
            N F T 등록하기
          </div>
          <div className="absolute top-0 -right-200 hidden h-87 w-184 rounded-20 bg-red-2 text-14 font-semibold text-white group-hover:flex group-hover:items-center group-hover:justify-center">
            <div className="w-130 text-center">
              종이 헌혈증을 NFT로 등록할 수 있습니다.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
