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

<DonateCardMobile
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
  representativeImageUrl?: string;
  isCompleted: boolean;
}

export default function DonateCard({
  title,
  nickname,
  expirationDate,
  donatePercent,
  representativeImageUrl = "/images/logo.svg",
  isCompleted,
}: Iprops) {
  timeago.register("ko", koLocale);

  return (
    <div
      onClick={() => console.log("click!")}
      className={`mr-48 mb-100 flex h-440 w-300 flex-col rounded-30 border border-pen-0 p-16 transition delay-150 duration-150 ease-in-out hover:-translate-y-1 hover:scale-110 ${
        isCompleted ? "opacity-30" : "bg-white"
      }`}
    >
      <div className="mb-30 flex justify-end text-14 font-medium text-pen-2">
        <TimeAgo datetime={expirationDate} locale="ko" />
      </div>
      <div className="mb-30 flex justify-center">
        <img src={representativeImageUrl} className="h-171 w-231"></img>
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

export function DonateCardMobile({
  title,
  nickname,
  expirationDate,
  donatePercent,
  representativeImageUrl = "/images/logo.svg",
  isCompleted,
}: Iprops) {
  timeago.register("ko", koLocale);

  return (
    <div
      onClick={() => console.log("click!")}
      className={`m-8 flex h-95 w-339 flex-row rounded-15 border border-pen-0 pt-8 pr-8 ${
        isCompleted ? "opacity-30" : "bg-white"
      }`}
    >
      <div className="mx-5 mt-8 ml-12">
        <img
          src={representativeImageUrl}
          className="h-51 w-51 rounded-10 border"
        ></img>
      </div>
      <div className="flex w-full flex-col">
        <div className="flex justify-end text-7 font-medium text-pen-2">
          <TimeAgo datetime={expirationDate} locale="ko" />
        </div>
        <div className="mb-3 flex justify-start text-11 font-bold text-pen-3">
          {title}
        </div>
        <div className="mb-5 flex justify-start text-8 font-light text-pen-4">
          {nickname}
        </div>
        <div className="flex justify-center">
          <CommonBar
            fontSize={6}
            width={237}
            height={18}
            percent={donatePercent}
          />
        </div>
      </div>
    </div>
  );
}
