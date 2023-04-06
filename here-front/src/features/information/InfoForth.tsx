import Lottie from "react-lottie-player";
import arrow from "../../../public/lottieJson/arrow.json";

export default function InfoForth() {
  return (
    <>
      <div className="relative mx-auto h-0 w-200">
        <div className="absolute top-12 left-10 z-0 h-28 w-180 rounded-5 bg-pink-3"></div>
      </div>
      <div className="relative z-10 mb-20">
        <span className="text-20 font-semibold ">종이 헌혈증 등록</span>
      </div>
      <div>
        <img
          src="info/bdCard.jpg"
          className="w-400 rounded-20 border-5 border-pink-2 p-2"
        />
        <p className="h-30 w-180 rounded-20 bg-red-1 leading-30 text-white">
          기존 종이 헌혈증
        </p>
      </div>
      <Lottie
        loop
        animationData={arrow}
        play
        style={{
          width: 100,
          height: 100,
          display: "inline-block",
          transform: "rotate(120deg)",
        }}
        className="mx-auto"
      />
      <div>
        <img
          src="info/qrCode.png"
          className="w-300 rounded-20 border-5 border-pink-2 p-2"
        />
        <p>QR 코드를 통해 헌혈증서 바코드 등록 페이지로 이동하세요</p>
      </div>
      <div>
        <img
          src="info/barcode.png"
          className="w-400 rounded-20 border-5 border-pink-2 p-2"
        />
      </div>
    </>
  );
}
