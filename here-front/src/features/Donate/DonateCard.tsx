import CommonBar from "@/components/Bar/CommonBar";
import TimeAgo from "timeago-react";
import * as timeago from "timeago.js";
import koLocale from "timeago.js/lib/lang/ko";
import { useRouter } from "next/navigation";
import { BoardStatus } from "@/enum/statusType";

interface Iprops {
  boardId: number;
  title: string;
  nickname: string;
  expirationDate: string;
  donatePercent: number;
  representativeImageUrl?: string;
  isCompleted: BoardStatus;
}

export default function DonateCard({
  title,
  nickname,
  expirationDate,
  donatePercent,
  representativeImageUrl = "/images/logo.svg",
  isCompleted,
  boardId,
}: Iprops) {
  const router = useRouter();
  timeago.register("ko", koLocale);

  return (
    <div
      onClick={() => router.push(`/donate/${boardId}`)}
      className={`mx-24 mb-100 flex h-335 w-230 flex-col rounded-30 border border-pen-0 p-16 transition delay-150 duration-150 ease-in-out hover:-translate-y-1 hover:scale-110 ${
        isCompleted == BoardStatus.ACTIVE ? "bg-white" : "opacity-30"
      }`}
    >
      <div className="mb-16 flex justify-end text-12 font-medium text-pen-2">
        <TimeAgo datetime={expirationDate} locale="ko" />
      </div>
      <div className="mb-14 flex justify-center">
        <img src={representativeImageUrl} className="h-160 w-160"></img>
      </div>
      <div className="mb-3 flex min-h-35 justify-start text-14 font-bold leading-18 text-pen-3">
        {title}
      </div>
      <div className="mb-8 ml-1 flex justify-start text-12 font-light text-pen-4">
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
  boardId,
}: Iprops) {
  const router = useRouter();
  timeago.register("ko", koLocale);

  return (
    <div
      onClick={() => router.push(`/donate/${boardId}`)}
      className={`m-8 flex h-95 w-310 flex-row rounded-15 border border-pen-0 pt-8 pr-8 ${
        isCompleted == BoardStatus.ACTIVE ? "bg-white" : "opacity-30"
      }`}
    >
      <img
        src={representativeImageUrl}
        className="ml-8 mr-12 mt-10 h-50 w-50 rounded-10 border"
      />

      <div className="mr-3 flex w-full flex-col">
        <div className="flex justify-end text-9 font-medium text-pen-2">
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
