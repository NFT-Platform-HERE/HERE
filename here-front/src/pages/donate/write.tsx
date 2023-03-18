import CommonBtn from "@/components/Button/CommonBtn";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import Image from "next/image";

const QuillWrapper = dynamic(async () => await import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export default function DonateWritePage() {
  const [value, setValue] = useState<string>("");
  const [targetQuantity, setTargetQuantity] = useState<number>(1);

  function printVal() {
    console.log("value", value);
  }

  function handleTargetQuantityPlus() {
    setTargetQuantity(targetQuantity + 1);
  }

  function handleTargetQuantityMinus() {
    if (targetQuantity > 1) {
      setTargetQuantity(targetQuantity - 1);
    }
  }

  return (
    <div className="mt-25 w-full">
      <div className="mx-auto w-1200 mobile:w-360">
        <div className="mx-auto w-1100 mobile:w-340">
          <div className="mt-15 mb-15 mr-15 flex justify-end mobile:hidden ">
            <CommonBtn
              width={95}
              height={50}
              fontSize={20}
              children={"등록"}
              isDisabled={false}
              onClick={() => {}}
            />
          </div>
          <div className="mt-5 mb-15 hidden justify-end mobile:flex">
            <CommonBtn
              width={73}
              height={34}
              fontSize={14}
              children={"등록"}
              isDisabled={false}
              onClick={() => {}}
            />
          </div>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            className="mb-5 text-20 text-pen-2 outline-none mobile:text-13"
          />
          <div className="mb-15 h-1 w-full bg-gray-200"></div>
          <div className="mb-5 flex items-center justify-start">
            <div className="mr-31 text-18 font-normal text-pen-2 mobile:text-14">
              * 목표수량
            </div>
            <div className="mr-8 flex h-55 w-85 items-center justify-center rounded-60 border border-pen-0 text-18 font-normal text-pen-2 mobile:h-39 mobile:w-56 mobile:text-14">
              {targetQuantity}
            </div>
            <img
              src={"/icons/add-circle-button.svg"}
              onClick={handleTargetQuantityPlus}
              className="h-70 w-70 mobile:h-45 mobile:w-45"
            />
            <img
              src={"/icons/minus-circle-button.svg"}
              onClick={handleTargetQuantityMinus}
              className="h-70 w-70 mobile:h-45 mobile:w-45"
            />
          </div>
          <div className="mb-25 flex items-center justify-start">
            <div className="mr-31 text-18 font-normal text-pen-2 mobile:text-14">
              * 마감기한
            </div>
            <div className="mr-8 flex h-55 w-220 items-center justify-start rounded-60 border border-pen-0 text-18 font-normal text-pen-2 mobile:h-38 mobile:w-151 mobile:text-6">
              <img
                src={"/icons/calendar.svg"}
                className="ml-20 mr-40 mb-5 h-38 w-38 mobile:mr-25 mobile:ml-15 mobile:h-23 mobile:w-23"
              />
              날짜 선택
            </div>
          </div>
          {/* <button onClick={printVal}>내용 확인</button> */}
          <QuillWrapper
            theme="snow"
            value={value}
            onChange={setValue}
            className="mb-70 h-332 w-920 mobile:w-350"
          />
          <p className="mb-30 w-510 text-16 font-light text-pen-1 mobile:mt-150 mobile:w-270 mobile:text-12">
            ※ 게시글 작성 이후 헌혈증 NFT 양도가 시작되면 ‘목표
            수량’,‘마감기한’을 수정할 수 없으니 신중하게 작성해주세요!
          </p>
        </div>
      </div>
    </div>
  );
}