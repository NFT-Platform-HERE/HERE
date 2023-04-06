import Lottie from "react-lottie-player";
import arrow from "../../../public/lottieJson/arrow.json";
import mainArrow from "../../../public/lottieJson/main_arrow.json";

export default function InfoForth() {
  return (
    <>
      <div className="relative mx-auto h-0 w-200">
        <div className="absolute top-12 left-10 z-0 h-28 w-180 rounded-5 bg-pink-3"></div>
      </div>
      <div className="relative z-10 mb-20">
        <span className="text-20 font-semibold ">종이 헌혈증 등록</span>
      </div>
      <div className="mx-auto my-30 w-400">
        <img
          src="info/bdCard.jpg"
          className="w-400 rounded-20 border-5 border-pink-2 p-2"
        />
        <p className="mx-auto mt-2 inline-block h-30 w-180 rounded-20 bg-red-1 leading-30 text-white">
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
          transform: "rotate(-150deg)",
        }}
        className="mx-auto"
      />
      <div className="flex h-650 w-1200 rounded-20 border-4 border-pink-2 px-100 pt-50">
        <div className="flex w-400 flex-col items-center">
          <img src="info/qrCode.png" className="w-300 rounded-20 pt-50" />
          <p className="mt-30">
            <strong>QR 코드</strong>를 통해 바코드 등록 페이지로 이동하세요
          </p>
        </div>
        <Lottie
          loop
          animationData={mainArrow}
          play
          style={{
            width: 200,
            height: 200,
            display: "inline-block",
            transform: "rotate(-90deg)",
            marginTop: 150,
          }}
        />
        <div>
          <img src="info/barcode.png" className="w-400 rounded-20  p-2" />
          <p className="mt-20">
            바코드를 인식하여 기존 헌혈증서를 <strong>NFT</strong>로 만들어요
          </p>
        </div>
      </div>
    </>
  );
}
