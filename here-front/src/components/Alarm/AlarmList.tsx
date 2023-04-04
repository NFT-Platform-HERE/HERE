import { useState } from "react";

interface Iprops {
  text: string;
  onClick: () => void;
}

export default function AlarmList({ text, onClick }: Iprops) {
  const [read, setRead] = useState<string>("INACTIVE");
  const changeStatus = () => {
    setRead("ACTIVE");
    onClick();
  };
  return (
    <>
      {read === "ACTIVE" ? (
        <div
          className="mx-auto my-5 flex min-h-40 w-320 cursor-pointer items-center rounded-10 bg-pen-00 py-8 px-10 text-14 font-light text-pen-2 mobile:w-[100%]"
          onClick={changeStatus}
        >
          {text}
        </div>
      ) : (
        <div
          className="mx-auto my-5 flex min-h-40 w-320 cursor-pointer items-center rounded-10 bg-pink-1 py-8 px-10 text-14 font-light mobile:w-[100%]"
          onClick={changeStatus}
        >
          {text}
        </div>
      )}
    </>
  );
}
