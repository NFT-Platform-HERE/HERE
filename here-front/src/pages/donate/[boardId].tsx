import HeartBar from "@/components/Bar/HeartBar";
import CheerBtn from "@/components/Button/CheerBtn";
import CommonBtn from "./../../components/Button/CommonBtn";
import { Suspense, useState } from "react";
import DonateSendModal from "@/features/Donate/DonateSendModal";
import useDonateDetailQuery from "@/apis/donate/useDonateDetailQuery";
import { GetServerSideProps } from "next";
import CircularProgress from "@mui/material/CircularProgress";
import TimeAgo from "timeago-react";
import * as timeago from "timeago.js";
import koLocale from "timeago.js/lib/lang/ko";
import parse from "html-react-parser";
import useMemberInfoQuery from "@/apis/blood/useMemberInfoQuery";
import { Swiper, SwiperSlide } from "swiper/react";
import DonateCheerMsg from "@/features/Donate/DonateCheerMsg";

interface Iprops {
  boardId: string;
}

export default function DonateDetailPage({ boardId }: Iprops) {
  const [opendSendModal, setOpendSendModal] = useState<boolean>(false);
  timeago.register("ko", koLocale);

  const nowBoard = useDonateDetailQuery(parseInt(boardId));
  console.log(nowBoard);

  const memberId = nowBoard?.data.memberId;
  const writerInfo = useMemberInfoQuery(memberId);

  const closeModal = () => {
    setOpendSendModal(false);
  };

  return (
    <div className="mb-30 min-h-fit w-full">
      <div className="mx-auto flex w-1200 justify-center mobile:w-350 mobile:flex-col ">
        <Suspense fallback={<CircularProgress />}>
          <div className="w-900 border border-pen-0 p-40 mobile:mb-25 mobile:w-330 mobile:border-none mobile:p-5">
            <div className="mb-18 h-30 w-110 rounded-15 bg-red-1 text-center text-14 font-normal leading-30 text-white mobile:h-24 mobile:w-90 mobile:text-11 mobile:leading-24">
              <TimeAgo datetime={nowBoard.data.deadline} locale="ko" /> 마감
            </div>
            <div className="mb-35 text-22 font-light mobile:text-18">
              {nowBoard.data.title}
            </div>
            <div className="flex justify-start">
              <div className="mobile:hidden">
                <HeartBar
                  width={735}
                  height={12}
                  fontSize={15}
                  percent={nowBoard.data.percentage}
                />
              </div>
              <div className="hidden mobile:block">
                <HeartBar
                  width={300}
                  height={8}
                  fontSize={11}
                  percent={nowBoard.data.percentage}
                />
              </div>
            </div>
            <div className="mt-35 mb-72 flex justify-between mobile:mb-5">
              <span className="text-16 font-medium text-pen-3">
                현재 수량: {nowBoard.data.curQuantity}개
              </span>
              <span className="text-16 font-medium text-pen-0">
                목표 수량: {nowBoard.data.goalQuantity}개
              </span>
            </div>
            <div className="flex justify-around">
              {/* <button>
                <img src="/icons/expand_left_light.svg" />
              </button>
              <img
                src={"/images/logo.svg"}
                className="h-370 w-450 mobile:h-168 mobile:w-228"
              ></img>
              <button>
                <img src="/icons/expand_right_light.svg" />
              </button> */}
              <Swiper>
                {nowBoard.data.boardImgUrlList.map((item: string) => {
                  <SwiperSlide>
                    <img src={item} alt="boardImg" />
                  </SwiperSlide>;
                })}
              </Swiper>
            </div>
            <div className="ProseMirror text-16 font-light mobile:text-11">
              {parse(nowBoard.data.content)}
            </div>
          </div>
        </Suspense>
        <div className="flex w-300 flex-col items-center border border-pen-0 p-35 mobile:w-330 mobile:border-none mobile:p-5">
          <Suspense fallback={<CircularProgress />}>
            <div className="flex w-full flex-col items-center mobile:flex-row mobile:justify-center">
              <img
                src={writerInfo.data && writerInfo.data.characterImgUrl}
                className="mb-15 h-215 w-215 mobile:h-100 mobile:w-100"
              />
              <div className="mb-25 w-full px-10 mobile:ml-25 mobile:w-fit mobile:px-0">
                <p className="mb-15 text-21 font-medium text-pen-2 mobile:text-15">
                  {writerInfo.data && writerInfo.data.nickname}
                </p>
                <p className="text-18 font-normal text-pen-2 mobile:text-13">
                  헌혈 LV.{writerInfo.data && writerInfo.data.level}
                </p>
                <p className="text-18 font-normal text-pen-2 mobile:text-13">
                  헌혈 횟수: {writerInfo.data && writerInfo.data.bdCnt}회
                </p>
              </div>
            </div>
            <CommonBtn
              width={250}
              height={50}
              fontSize={18}
              children={"기부하기"}
              isDisabled={false}
              onClick={() => setOpendSendModal(true)}
            />
            {opendSendModal && (
              <DonateSendModal
                onClick={closeModal}
                writerInfo={writerInfo.data}
                boardId={boardId}
              />
            )}
            <DonateCheerMsg memberId={memberId} boardId={boardId} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Iprops> = async ({
  params,
}) => {
  const { boardId } = params as { boardId: string };

  return {
    props: {
      boardId,
    },
  };
};
