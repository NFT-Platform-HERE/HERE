import CommonBtn from "@/components/Button/CommonBtn";
import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import dynamic from "next/dynamic";
import DonateDateButton from "@/features/Donate/DonateDateButton";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import CircularProgress from "@mui/material/CircularProgress";

const DonateReactQuill = dynamic(
  () => import("../../features/Donate/DonateReactQuill").then((m) => m.default),
  {
    ssr: false,
    loading: () => (
      <div className="mb-70 flex h-332 w-920 items-center justify-center mobile:w-350">
        <CircularProgress color="error" />
      </div>
    ),
  },
);

export default function DonateWritePage() {
  const [value, setValue] = useState<string>("");
  const [targetQuantity, setTargetQuantity] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date>(new Date());

  const ref = useRef<HTMLButtonElement>(null);

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
        <div className="mx-auto w-950 mobile:w-340">
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
            <div className="flex-auto">
              <DatePicker
                selected={startDate}
                dateFormat="yyyy년 MM월 dd일"
                onChange={(date: Date) => setStartDate(date)}
                minDate={new Date()}
                locale={ko}
                customInput={
                  <DonateDateButton
                    value={value}
                    onClick={() => {}}
                    forwardedRef={ref}
                  />
                }
              />
            </div>
          </div>
          {/* <button onClick={printVal}>내용 확인</button> */}
          <DonateReactQuill value={value} onChange={setValue} />
          <p className="mb-30 w-510 text-16 font-light text-pen-1 mobile:mt-150 mobile:w-270 mobile:text-12">
            ※ 게시글 작성 이후 헌혈증 NFT 양도가 시작되면 ‘목표
            수량’,‘마감기한’을 수정할 수 없으니 신중하게 작성해주세요!
          </p>
        </div>
      </div>
    </div>
  );
}
