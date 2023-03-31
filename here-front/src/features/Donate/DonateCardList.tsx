import { Donation } from "@/types/Donation";
import DonateCard, { DonateCardMobile } from "./DonateCard";

interface Iprops {
  items: Donation[];
}

export default function DonateCardList({ items }: Iprops) {
  return (
    <>
      {items?.map((item) => (
        <div className="mobile:hidden" key={item.boardId}>
          <DonateCard
            title={item.title}
            nickname={item.nickname}
            isCompleted={item.status}
            donatePercent={item.percentage}
            expirationDate={item.dDay}
            representativeImageUrl={item.boardImgUrl}
            boardId={item.boardId}
          />
        </div>
      ))}
      {items?.map((item) => (
        <div className="hidden mobile:inline-block" key={item.boardId}>
          <DonateCardMobile
            title={item.title}
            nickname={item.nickname}
            isCompleted={item.status}
            donatePercent={item.percentage}
            expirationDate={item.dDay}
            representativeImageUrl={item.boardImgUrl}
            boardId={item.boardId}
          />
        </div>
      ))}
    </>
  );
}
