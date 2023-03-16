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
      className={`mr-48 mb-100 flex h-335 w-230 flex-col rounded-30 border border-pen-0 p-16 transition delay-150 duration-150 ease-in-out hover:-translate-y-1 hover:scale-110 ${
        isCompleted ? "opacity-30" : "bg-white"
      }`}
    >
      <div className="mb-20 flex justify-end text-12 font-medium text-pen-2">
        <TimeAgo datetime={expirationDate} locale="ko" />
      </div>
      <div className="mb-12 flex justify-center">
        <img src={representativeImageUrl} className="h-160 w-160"></img>
      </div>
      <div className="mb-3 flex justify-start text-14 font-bold text-pen-3">
        {title}
      </div>
      <div className="mb-15 flex justify-start text-12 font-light text-pen-4">
        {nickname}
      </div>
      <div className="mb-31 flex justify-center">
        <CommonBar
          fontSize={16}
          width={200}
          height={30}
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
      <img
        src={representativeImageUrl}
        className="ml-8 mr-12 mt-10 h-50 w-50 rounded-10 border"
      />

      <div className="mr-3 flex w-full flex-col">
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
            width={225}
            height={18}
            percent={donatePercent}
          />
        </div>
      </div>
    </div>
  );
}
