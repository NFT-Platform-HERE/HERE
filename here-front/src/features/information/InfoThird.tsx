import Lottie from "react-lottie-player";
import check from "../../../public/lottieJson/check.json";

export default function InfoThird() {
  return (
    <>
      <div className="relative mx-auto h-0 w-200">
        <div className="absolute top-12 left-24 z-0 h-28 w-150 rounded-5 bg-pink-3"></div>
      </div>
      <div className="relative z-10 mb-20">
        <span className="text-20 font-semibold ">제출하기</span>
      </div>
      <div className="mx-auto mt-30 flex w-1200 justify-center px-100">
        <div>
          <p className="text-20">기관</p>
          <div className="h-400 w-400 rounded-30 border-4 border-pink-2">
            <p>학교, 예비군, 회사 등에 헌혈 사실 인정을 위해 사용됩니다</p>
            <p>NFT 고유 Hash값과 Token ID를 제출하여 진위여부를 확인해요</p>
          </div>
        </div>
        <Lottie
          loop
          animationData={check}
          play
          style={{
            width: 100,
            height: 100,
            display: "inline-block",
          }}
          className="mx-auto"
        />
        <div>
          <p className="text-20">병원</p>
          <div className="h-400 w-400 rounded-30 border-4 border-pink-2">
            <p>병원용 NFT는 수술 시 혈액비용 공제를 위해 사용됩니다</p>
            <p>사용 승인 시 병원으로 NFT의 소유권이 이전됩니다</p>
          </div>
        </div>
      </div>
    </>
  );
}
