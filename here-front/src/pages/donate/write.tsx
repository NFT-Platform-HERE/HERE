import CommonBtn from "@/components/Button/CommonBtn";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
                className="text-20 text-pen-2 outline-none mobile:text-13"
              />
              <button onClick={printVal}>내용 확인</button>
              <ReactQuill theme="snow" value={value} onChange={setValue} />
            </div>
            <div className="mobile:hidden"></div>
          </div>
        </div>
        <div className="mobile:hidden"></div>
      </div>
    </div>
  );
}
