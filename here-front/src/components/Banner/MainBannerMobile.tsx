export default function MainBannerMobile() {
  return (
    <div className="relative h-410 w-full overflow-hidden bg-[#F6EAEA] pt-30">
      <div className="relative mx-auto w-210">
        <img src="mainBanner/fullName.png" className="w-120" />
        <img
          src="mainBanner/heart1.png"
          className="absolute right-0 top-[13%] w-[8%] animate-wiggle"
        />
        <img src="mainBanner/name.png" className="my-10 w-210" />
        <p className="animate-typing overflow-hidden whitespace-nowrap text-12 font-medium text-red-2 ">
          마음을 나누는 헌혈, NFT로 간직하세요
        </p>
      </div>
      <div className="-ml-[7%] mt-20 w-[107%]">
        <img src="mainBanner/mainImg.png" className=" inline-block w-full" />
        <img
          src="mainBanner/heart2.png"
          className="absolute left-[51%] bottom-[18%] w-[7%] animate-pulse"
        />
      </div>

      <img
        src="mainBanner/wave_mini.png"
        className="absolute bottom-0 w-full"
      />
    </div>
  );
}
