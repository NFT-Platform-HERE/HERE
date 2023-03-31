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
import DonateCheerMsg from "@/features/Donate/DonateCheerMsg";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Iprops {
  boardId: string;
}

SwiperCore.use([Navigation, Pagination]);

export default function DonateDetailPage({ boardId }: Iprops) {
  const [opendSendModal, setOpendSendModal] = useState<boolean>(false);
  timeago.register("ko", koLocale);

  const nowBoard = useDonateDetailQuery(parseInt(boardId));

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
            {nowBoard.data.boardImgUrlList.length != 0 && (
              <div className="mb-50 flex justify-around">
                <Swiper
                  spaceBetween={0}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  className="flex h-400 w-800 flex-wrap items-center justify-center mobile:mt-30 mobile:h-300 mobile:w-full mobile:min-w-300"
                >
                  {nowBoard.data.boardImgUrlList.map(
                    (item: string, index: number) => (
                      <SwiperSlide key={index}>
                        <img
                          src={item}
                          alt="boardImg"
                          className="max-w-600 mobile:max-w-300 mx-auto h-400 mobile:h-300"
                        />
                      </SwiperSlide>
                    ),
                  )}
                </Swiper>
              </div>
            )}
            <div className="ProseMirror mx-auto w-800 text-16 font-light mobile:w-300 mobile:text-13">
              {parse(nowBoard.data.content)}
            </div>
          </div>
        </Suspense>
        <hr className="mb-20 hidden border-2 mobile:block" />
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
                writerId={memberId}
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
