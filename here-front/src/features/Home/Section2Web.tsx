import MoveBtn from "@/components/Button/MoveBtn";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Section2Web() {
  useEffect(() => {
    AOS.init();
  }, []);

  const router = useRouter();
  const goToNFTPage = () => {
    router.push("/my-nft");
  };

  return (
    <section className="my-99 mx-auto flex w-[75rem] justify-center mobile:w-0">
      <div
        data-aos="fade-right"
        data-aos-duration="1500"
        className="mx-20 flex w-440 flex-col items-center"
      >
        <div className="relative h-0 w-200">
          <div className="absolute top-20 left-0 z-0 h-28 w-190 rounded-5 bg-pink-3"></div>
        </div>
        <div className="z-10 mb-20">
          <span className="text-30 font-semibold text-red-3">NFT</span>
          <span className="mx-8 text-24 font-medium">헌혈증서</span>
        </div>
        <img
          src="mainItems/mainNFTInfo.svg"
          alt="mainNFTInfo"
          className="w-320"
        />
      </div>
      <div
        className="relative mx-20"
        data-aos="fade-left"
        data-aos-duration="1500"
      >
        <img src="mainItems/mainNFT.png" alt="mainNFT" className="w-440" />
        <div className="absolute right-6 -bottom-6">
          <MoveBtn
            width={160}
            height={28}
            children={"나의 NFT 보러가기"}
            fontSize={13}
            onClick={goToNFTPage}
          />
        </div>
      </div>
    </section>
  );
}
