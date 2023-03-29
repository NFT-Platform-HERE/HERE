import useDonateCheerUpListQuery from "@/apis/donate/useDonateCheerUpListQuery";
import useDonateCheerUpUpdateQuery from "@/apis/donate/useDonateCheerUpUpdateQuery";
import CheerBtn from "@/components/Button/CheerBtn";

interface Iprops {
  memberId: string;
  boardId: string;
}

export default function DonateCheerMsg({ memberId, boardId }: Iprops) {
  const { mutate } = useDonateCheerUpUpdateQuery();
  const cheerMsgCnt = useDonateCheerUpListQuery(parseInt(boardId), memberId);
  //   console.log(cheerMsgCnt.data);

  const selectCheerBtn = (msgId: number) => {
    const payload = {
      boardId: parseInt(boardId),
      cheeringMsgId: msgId,
      memberId,
    };
    mutate(payload);
  };

  return (
    <>
      <p className="mt-30 mb-15 text-21 font-medium text-pen-2 mobile:text-15">
        응원 메시지
      </p>
      <div className="my-5">
        <CheerBtn
          width={250}
          height={45}
          fontSize={14}
          count={cheerMsgCnt.data && cheerMsgCnt.data[0].cnt}
          onClick={() => selectCheerBtn(1)}
          imgUrl={"/icons/blood_count.svg"}
          children={"응원해요"}
          isChecked={cheerMsgCnt.data && cheerMsgCnt.data[0].isSelected}
        />
      </div>
      <div className="my-5">
        <CheerBtn
          width={250}
          height={45}
          fontSize={14}
          count={cheerMsgCnt.data && cheerMsgCnt.data[1].cnt}
          onClick={() => selectCheerBtn(2)}
          imgUrl={"/icons/blood_recent.svg"}
          children={"함께해요"}
          isChecked={cheerMsgCnt.data && cheerMsgCnt.data[1].isSelected}
        />
      </div>
      <div className="my-5">
        <CheerBtn
          width={250}
          height={45}
          fontSize={14}
          count={cheerMsgCnt.data && cheerMsgCnt.data[2].cnt}
          onClick={() => selectCheerBtn(3)}
          imgUrl={"/icons/blood_next.svg"}
          children={"힘내세요"}
          isChecked={cheerMsgCnt.data && cheerMsgCnt.data[2].isSelected}
        />
      </div>
    </>
  );
}
