import React from "react";

interface Iprops {
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function DonateCheckBox({ checked, onChange }: Iprops) {
  return (
    <label>
      <div className="flex items-center ">
        <input
          type="checkbox"
          className="h-25 w-25 mobile:h-16 mobile:w-16"
          checked={checked}
          onChange={onChange}
        />
        <span className="ml-8 text-16 font-normal text-pen-2 mobile:ml-5 mobile:text-10">
          내 글 보기
        </span>
      </div>
    </label>
  );
}
