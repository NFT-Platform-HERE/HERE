/**
 * @author JeongOn
 */

{
  /* 
  - 사용 예시:
<DonateSearchInputBox
    width={827}
    height={84}
    fontSize={24}
    value={inputValue}
    onChange={handleChange}
/>
  */
}

import React from "react";

interface Iprops {
  width: number;
  height: number;
  fontSize: number;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function DonateSearchInputBox({
  width,
  height,
  fontSize,
  value,
  onChange,
}: Iprops) {
  return (
    <div
      className="flex items-center rounded-55 border border-pen-0"
      css={[
        {
          width: width,
          height: height,
          fontSize: fontSize,
        },
      ]}
    >
      <input
        className="flex-grow pl-44 outline-none"
        type="text"
        onChange={onChange}
        value={value}
        size={fontSize}
        placeholder="작성자, 제목, 내용을 검색하세요"
      />
      <img src={"/icons/search-icon.svg"} className="mr-25" />
    </div>
  );
}
