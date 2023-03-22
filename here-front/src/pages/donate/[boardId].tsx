import HeartBar from "@/components/Bar/HeartBar";
import CheerBtn from "@/components/Button/CheerBtn";
import { useRouter } from "next/router";
import CommonBtn from "./../../components/Button/CommonBtn";

export default function DonateDetailPage() {
  const router = useRouter();
  const { boardId } = router.query;

  return (
    <div className="flex w-full justify-center ">
      <div className="flex w-1200 justify-center   mobile:w-360">
        <div className="inline-block h-1300 w-900 border border-pen-0 pt-45 pl-40 pr-40">
          <div className="mb-18 h-36 w-97 rounded-15 bg-red-1 text-center text-16 font-normal leading-36 text-white">
            3일 남음
          </div>
          <div className="mb-35 text-22 font-light">
            엄마 수술을 앞두고 헌혈증이 필요해요
          </div>
          <div className="flex justify-start">
            <HeartBar width={735} height={12} fontSize={15} percent={25} />
          </div>
          <div className="mt-35 mb-72 flex justify-between">
            <span className="text-16 font-medium text-pen-3">
              현재 수량: 8개
            </span>
            <span className="text-16 font-medium text-pen-0">
              목표 수량: 30개
            </span>
          </div>
          <div className="flex justify-around">
            <button>
              <img src="/icons/expand_left_light.svg" />
            </button>
            <img src={"/images/logo.svg"} className="h-370 w-450"></img>
            <button>
              <img src="/icons/expand_right_light.svg" />
            </button>
          </div>
          <p className="text-16 font-extralight">
            안녕하세요. 저는 현재 수원에서 중학교에 다니고 있는 3학년
            학생입니다. <br />
            2달 전, 저희 어머니께서는 퇴근하던 길에 교통사고를 당하셨습니다.{" "}
            <br />
            다행히 엄청 크게 다치시지는 않았지만 저희 집안 형편이 넉넉하지
            못하고 어머니께서도 2달 동안 일을 나가지 못하셔서 수입이 많이 떨어진
            상태입니다. <br />
            저희 가족은 4인 가족인데 현재 아빠가 퇴근하시고 나서 간병을 하고
            계시는 상태인데요 <br /> 부모님께서 크게 말씀은 안 하시지만
            금전적으로 많이 힘든 상황인 것 같습니다. <br /> 그러던 중에 이
            사이트를 알게 돼서 작게나마 부모님에게 도움이 되고 싶습니다. <br />
            도와주시는 모든 분들 진심으로 감사드립니다.
          </p>
        </div>
        <div className="flex h-1300 w-300 flex-col items-center justify-start border border-pen-0 pt-55 pl-35 pr-35">
          <img src="/NFT_bg_1.gif" className="mb-15 h-215 w-215" />
          <p className="mb-15 text-21 font-medium text-pen-2">닉네임</p>
          <div className="mb-25 w-full">
            <p className="text-18 font-normal text-pen-2">헌혈 LV.10</p>
            <p className="text-18 font-normal text-pen-2">헌혈 횟수: 23회</p>
          </div>
          <CommonBtn
            width={260}
            height={50}
            fontSize={22}
            children={"기부하기"}
            isDisabled={false}
            onClick={() => {}}
          />
          <p
            className="mt-30
           mb-15 text-21 font-medium text-pen-2"
          >
            응원 메시지
          </p>
          <div className="my-5">
            <CheerBtn
              width={265}
              height={50}
              fontSize={15}
              count={5}
              onClick={() => {}}
              imgUrl={"/icons/blood_count.svg"}
              children={"응원해요"}
            />
          </div>
          <div className="my-5">
            <CheerBtn
              width={265}
              height={50}
              fontSize={15}
              count={3}
              onClick={() => {}}
              imgUrl={"/icons/blood_recent.svg"}
              children={"함께해요"}
            />
          </div>
          <div className="my-5">
            <CheerBtn
              width={265}
              height={50}
              fontSize={15}
              count={2}
              onClick={() => {}}
              imgUrl={"/icons/blood_next.svg"}
              children={"힘내세요"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
