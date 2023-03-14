/**
 * @author JeongOn
 */

{
  /* 
- 사용 예시:
<DonateCard
title="제목"
nickname="닉네임"
expirationTime={3}
donatePercent={25}
representativeImageUrl={"/next.svg"}
isCompleted={false}
/> */
}

interface Iprops {
  title: string;
  nickname: string;
  expirationTime: number;
  donatePercent: number;
  representativeImageUrl: string;
  isCompleted: boolean;
}

export default function DonateCard({
  title,
  nickname,
  expirationTime,
  donatePercent,
  representativeImageUrl,
  isCompleted,
}: Iprops) {
  return (
    <div
      onClick={() => console.log("click!")}
      className={`m-8 flex h-440 w-300 flex-col rounded-30 border border-pen-0 p-16 mobile:h-95 mobile:w-339 mobile:flex-row ${
        isCompleted ? "bg-red-400" : "bg-white"
      }`}
    >
      <div className="mb-30 flex justify-end text-14 font-medium text-pen-2 mobile:text-7">
        3일남음
      </div>
      <div className="mb-30 flex justify-center">
        <img
          src={representativeImageUrl}
          className="m-5 h-171 w-231 p-5 mobile:h-51 mobile:w-51"
        ></img>
      </div>
      <div className="mb-8 flex justify-start text-18 font-bold text-pen-3  mobile:text-11">
        {title}
      </div>
      <div className="mb-25 flex justify-start text-16 font-light text-pen-4 mobile:text-8">
        {nickname}
      </div>
    </div>
  );
}
