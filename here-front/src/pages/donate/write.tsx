import CommonBtn from "@/components/Button/CommonBtn";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const QuillWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export default function DonateWritePage() {
  const [value, setValue] = useState("");

  function printVal() {
    console.log("value", value);
  }

  return (
    <div className="mt-25 w-full">
      <div className="grid grid-cols-8 gap-2">
        <div className="mobile:hidden"></div>
        <div className="col-span-6 mobile:col-span-8">
          <div className="grid grid-cols-8 gap-2">
            <div className="mobile:hidden"></div>
            <div className="col-span-6 mobile:col-span-8">
              <div className="mr-10 mt-5 mb-10 flex justify-end mobile:hidden">
                <CommonBtn
                  width={95}
                  height={50}
                  fontSize={20}
                  children={"등록"}
                  isDisabled={false}
                  onClick={() => {}}
                />
              </div>
              <input
                type="text"
                placeholder="제목을 입력하세요"
                className="mb-33 text-20 text-pen-2 outline-none mobile:text-13"
              />
              <div className="mb-5 flex items-center justify-start">
                <div className="mr-31 text-18 font-normal text-pen-2">
                  * 목표수량
                </div>
                <div className="mr-8 flex h-55 w-85 items-center justify-center rounded-60 border border-pen-0 text-18 font-normal text-pen-2">
                  30
                </div>
                {/* <div className="mx-3 flex h-50 w-50 items-center justify-center rounded-50 border border-pen-0 text-30 font-normal text-pen-2">
                  +
                </div>
                <div className="mx-3 flex h-50 w-50 items-center justify-center rounded-50 border border-pen-0 text-30 font-normal text-pen-2">
                  -
                </div> */}
                <img src={"/icons/add-circle-button.svg"} />
                <img src={"/icons/minus-circle-button.svg"} />
              </div>
              <div className="mb-25 flex items-center justify-start">
                <div className="mr-31 text-18 font-normal text-pen-2">
                  * 마감기한
                </div>
                <div className="mr-8 flex h-55 w-85 items-center justify-center rounded-60 border border-pen-0 text-18 font-normal text-pen-2">
                  30
                </div>
              </div>
              {/* <button onClick={printVal}>내용 확인</button> */}
              <QuillWrapper theme="snow" value={value} onChange={setValue} />
            </div>
            <div className="mobile:hidden"></div>
          </div>
        </div>
        <div className="mobile:hidden"></div>
      </div>
    </div>
  );
}
