import HeartBar from "@/components/Bar/HeartBar";
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
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import useDonateDelete from "@/apis/donate/useDonateDelete";
import { DonationDelete } from "@/types/DonationDelete";
import { BoardStatus } from "@/enum/statusType";
import { useRouter } from "next/navigation";
import useDonateNftCountQuery from "@/apis/donate/useDonateNftCountQuery";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface Iprops {
  boardId: string;
}

SwiperCore.use([Navigation, Pagination]);

export default function DonateDetailPage({ boardId }: Iprops) {
  timeago.register("ko", koLocale);

  const router = useRouter();

  const [opendSendModal, setOpendSendModal] = useState<boolean>(false);

  const memberId = useSelector((state: RootState) => state.member.memberId);

  const maxCnt = useDonateNftCountQuery(memberId);

  const nowBoard = useDonateDetailQuery(parseInt(boardId));

  const writerId = nowBoard?.data.memberId;
  const writerInfo = useMemberInfoQuery(writerId);

  const mutation = useDonateDelete();

  async function handleDeleteButton() {
    confirmDelete();
  }

  function handleEditButton() {
    moveDonateEditPage();
  }

  function handleDonateButton() {
    setOpendSendModal(true);
  }

  async function handleCloseButton() {
    await closeDonateArticle();
  }

  const closeModal = () => {
    setOpendSendModal(false);
  };

  const confirmDelete = () => {
    MySwal.fire({
      title: "정말 삭제하시겠습니까?",
      showDenyButton: true,
      showConfirmButton: false,
      denyButtonText: `삭제`,
    }).then((result) => {
      if (result.isDenied) {
        deleteDonateArticle();
      }
    });
  };

  async function deleteDonateArticle() {
    const payload: DonationDelete = {
      boardId: parseInt(boardId),
      writerId: writerId,
      status: BoardStatus.DELETE,
    };

    try {
      const result = await mutation.mutateAsync(payload);
      console.log("result", result);
      successDelete();
      moveDonateListPage();
    } catch (error) {
      console.error(error);
    }
  }

  const successDelete = () => {
    MySwal.fire({
      icon: "success",
      title: "삭제가 완료되었습니다.",

      showConfirmButton: false,
      timer: 1500,
    });
  };

  async function closeDonateArticle() {
    const payload: DonationDelete = {
      boardId: parseInt(boardId),
      writerId: writerId,
      status: BoardStatus.INACTIVE,
    };

    try {
      const result = await mutation.mutateAsync(payload);
      console.log("result", result);
    } catch (error) {
      console.error(error);
    }
  }

  function moveDonateListPage() {
    router.push("/donate");
  }

  function moveDonateEditPage() {
    router.push("/donate/edit");
  }

  function disableDonateButton() {
    if (maxCnt) {
      if (
        maxCnt.data?.cnt < 1 ||
        nowBoard.data.status == BoardStatus.INACTIVE
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  return (
    <div className="mb-30 min-h-fit w-full">
      <div className="mx-auto flex w-1200 justify-center mobile:w-350 mobile:flex-col ">
        <Suspense fallback={<CircularProgress />}>
          <div className="w-900 border border-pen-0 p-40 mobile:mb-25 mobile:w-330 mobile:border-none mobile:p-5">
            <div className="mb-18 flex justify-between">
              {nowBoard.data.status == BoardStatus.INACTIVE ? (
                <div className="h-30 w-110 rounded-15 bg-red-1 text-center text-14 font-normal leading-30 text-white mobile:h-24 mobile:w-90 mobile:text-11 mobile:leading-24">
                  마감 완료
                </div>
              ) : (
                <div className="h-30 w-110 rounded-15 bg-red-1 text-center text-14 font-normal leading-30 text-white mobile:h-24 mobile:w-90 mobile:text-11 mobile:leading-24">
                  <TimeAgo datetime={nowBoard.data.deadline} locale="ko" /> 마감
                </div>
              )}
              {nowBoard.data.status == BoardStatus.INACTIVE ? null : (
                <div>
                  {writerId == memberId ? (
                    <div className="text-pen-2">
                      <button className="mx-6" onClick={handleEditButton}>
                        수정
                      </button>
                      {nowBoard.data.curQuantity == 0 ? (
                        <button className="mx-6" onClick={handleDeleteButton}>
                          삭제
                        </button>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              )}
            </div>
            <div className="mb-35 text-22 font-light mobile:text-18">
              {nowBoard.data.title}
            </div>
            <div className="flex justify-start">
              <div className="mx-auto mobile:hidden">
                <HeartBar
                  width={816}
                  height={12}
                  fontSize={15}
                  percent={nowBoard.data.percentage}
                />
              </div>
              <div className="mx-auto hidden mobile:block">
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
                  {nowBoard.data.boardImgUrlList.map((item: any) => (
                    <SwiperSlide key={item.boardImgId}>
                      <img
                        src={item.imgUrl}
                        alt="boardImg"
                        className="max-w-600 mobile:max-w-300 mx-auto h-400 mobile:h-300"
                      />
                    </SwiperSlide>
                  ))}
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
            {writerId == memberId ? (
              <CommonBtn
                width={250}
                height={50}
                fontSize={18}
                children={"마감하기"}
                isDisabled={
                  nowBoard.data.status == BoardStatus.INACTIVE ? true : false
                }
                onClick={handleCloseButton}
              />
            ) : (
              <CommonBtn
                width={250}
                height={50}
                fontSize={18}
                children={"기부하기"}
                isDisabled={disableDonateButton()}
                onClick={handleDonateButton}
              />
            )}
            {opendSendModal && (
              <DonateSendModal
                onClick={closeModal}
                writerInfo={writerInfo.data}
                writerId={writerId}
                boardId={parseInt(boardId)}
              />
            )}
            <DonateCheerMsg memberId={writerId} boardId={boardId} />
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
