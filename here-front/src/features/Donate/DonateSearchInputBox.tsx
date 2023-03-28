/**
 * @author JeongOn
 */

{
  /* 
  - 사용 예시:
<DonateSearchInputBox
    value={inputValue}
    onChange={handleChange}
/>
  */
}

import React, { useState } from "react";

interface Iprops {
  setKeyword: (searchValue: string) => void;
  // value: string;
  // onChange: React.ChangeEventHandler<HTMLInputElement>;
  // onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

export default function DonateSearchInputBox({ setKeyword }: Iprops) {
  //   {
  //   value,
  //   onChange,
  //   onKeyDown,
  // }: Iprops

  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchValue(event.target.value);
  };

  const handleSearchInputKeyDown = (
    event: React.KeyboardEvent<HTMLElement>,
  ) => {
    if (event.code === "Enter") {
      setKeyword(searchValue);
    }
  };

  const searchKeyword = () => {
    setKeyword(searchValue);
  };

  return (
    <div className="flex h-65 w-700 items-center rounded-55 border border-pen-0 mobile:h-35 mobile:w-290">
      <input
        className="flex-grow pl-44 text-20 outline-none mobile:pl-20 mobile:text-11"
        type="text"
        onChange={handleSearchInputChange}
        value={searchValue}
        placeholder="작성자, 제목, 내용을 검색하세요"
        onKeyDown={handleSearchInputKeyDown}
      />
      <img
        onClick={searchKeyword}
        src={"/icons/search-icon.svg"}
        className="mr-15 cursor-pointer mobile:mr-10 mobile:h-20 mobile:w-20"
      />
    </div>
  );
}
