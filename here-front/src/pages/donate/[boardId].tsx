import HeartBar from "@/components/Bar/HeartBar";
import { useRouter } from "next/router";

export default function DonateDetailPage() {
  const router = useRouter();
  const { boardId } = router.query;

  return (
    <div className="mx-auto w-full">
      <div className="mx-auto w-1200 mobile:w-360">
        <div className="mx-auto inline-block h-1300 w-900 border border-pen-0 pt-55 pl-35 pr-35">
          <div className="mb-18 h-36 w-97 rounded-15 bg-red-1 text-center text-16 font-normal leading-36 text-white">
            3일 남음
          </div>
          <div className="mb-35 text-22 font-light">
            엄마 수술을 앞두고 헌혈증이 필요해요
          </div>
          <div className="flex justify-start">
            <HeartBar width={735} height={11} fontSize={15} percent={25} />
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
            <img src={"/images/logo.svg"} className="h-370 w-450"></img>
          </div>
        </div>
        <div className="mx-auto inline-block h-1300 w-300 border border-pen-0 pt-55 pl-35 pr-35">
          b
        </div>
      </div>
    </div>
  );
}
