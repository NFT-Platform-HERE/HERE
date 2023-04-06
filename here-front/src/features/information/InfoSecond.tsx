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

      <div className="inline-block w-500">
        <p>게시글의 기부하기 버튼을 눌렀을 때 나타나는 모달창이에요</p>
        <p>
          선택한 수량 만큼의 <strong>병원용 NFT</strong>의 소유권이 작성자에게
          이전됩니다:)
        </p>
      </div>
    </>
  );
}
