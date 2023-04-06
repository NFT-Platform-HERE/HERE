import Lottie from "react-lottie-player";
import arrow from "../../../public/lottieJson/arrow.json";

export default function InfoSecond() {
  return (
    <>
      <div className="relative mx-auto h-0 w-200">
        <div className="absolute top-12 left-24 z-0 h-28 w-150 rounded-5 bg-pink-3"></div>
      </div>
      <div className="relative z-10 mb-20">
        <span className="text-20 font-semibold ">기부하기</span>
      </div>
      <div className="flex w-1200 items-center justify-center px-100">
        <img src="info/give_modal2.png" className="inline-block w-600" />

        <Lottie
          loop
          animationData={arrow}
          play
          style={{
            width: 100,
            height: 100,
            display: "inline-block",
            transform: "rotate(-45deg)",
          }}
          className="mx-auto"
        />

        <div className="inline-block w-250">
          <p>게시글의 기부하기 버튼을 눌렀을 때</p>
          <p>나타나는 모달창이에요</p>
          <p className="mt-30">
            선택한 수량 만큼의 <strong>병원용 NFT</strong>의 소유권이 작성자에게
            이전됩니다:)
          </p>
        </div>
      </div>
      <div className="mt-30 flex w-1200 items-center justify-center px-100">
        <div className="inline-block w-400">
          <p>기부했던 헌혈증서가 병원에 제출되면</p>
          <p>
            <strong>원소유자</strong>에게도 알림이 갑니다
          </p>
          <p className="mt-16">
            내 헌혈증서의 이동 경로를 <strong>투명하게</strong> 알 수 있어요🤗
          </p>
        </div>
        <img
          src="info/send.png"
          className="w-600 rounded-20 border-4 border-pink-2"
        />
      </div>
    </>
  );
}
