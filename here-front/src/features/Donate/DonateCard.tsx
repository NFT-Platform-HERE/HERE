/**
 * @author JeongOn
 */

{
  /* 
- 사용 예시:
<DonateCard
title="제목"
nickname="닉네임"
expirationDate={"2023-03-14 16:46:08"}
donatePercent={25}
representativeImageUrl={"/next.svg"}
isCompleted={false}
/>

- 특이 사항:
반응형으로 하지 않고 별도 모바일 컴포넌트 제작
*/
}

import CommonBar from "@/components/Bar/CommonBar";
import TimeAgo from "timeago-react";
import * as timeago from "timeago.js";
import koLocale from "timeago.js/lib/lang/ko";

interface Iprops {
  title: string;
  nickname: string;
  expirationDate: string;
  donatePercent: number;
  representativeImageUrl: string;
  isCompleted: boolean;
}

export default function DonateCard({
  title,
  nickname,
  expirationDate,
  donatePercent,
  representativeImageUrl,
  isCompleted,
}: Iprops) {
  timeago.register("ko", koLocale);

  return (
    <div
      onClick={() => console.log("click!")}
      className={`m-8 flex h-440 w-300 flex-col rounded-30 border border-pen-0 p-16 ${
        isCompleted ? "bg-gray-300" : "bg-white"
      }`}
    >
      <div className="mb-30 flex justify-end text-14 font-medium text-pen-2">
        <TimeAgo datetime={expirationDate} locale="ko" />
      </div>
      <div className="mb-30 flex justify-center">
        <img src={representativeImageUrl} className="m-5 h-171 w-231 p-5"></img>
      </div>
      <div className="mb-8 flex justify-start text-18 font-bold text-pen-3">
        {title}
      </div>
      <div className="mb-25 flex justify-start text-16 font-light text-pen-4">
        {nickname}
      </div>
      <div className="mb-31 flex justify-center">
        <CommonBar
          fontSize={20}
          width={249}
          height={40}
          percent={donatePercent}
        />
      </div>
    </div>
  );
}
