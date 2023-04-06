export default function MainBannerWeb() {
  return (
    <div className="relative flex aspect-[3/1] w-full min-w-[1200px] flex-col flex-wrap overflow-hidden bg-[#F6EAEA] pt-50">
      <div className="relative -ml-[4%] -mb-10 inline-block w-[63%]">
        <img src="mainBanner/mainImg.png" className="w-full" />
        <img
          src="mainBanner/heart2.png"
          className="absolute left-[55%] top-[60%] w-[6%] animate-pulse"
        />
      </div>
      <div className="relative mt-50 inline-block w-[37%] pl-[2%]">
        <img src="mainBanner/fullName.png" className="w-[50%]" />
        <img src="mainBanner/name.png" className="my-20 w-[85%]" />
        <img
          src="mainBanner/heart1.png"
          className="absolute left-[80%] top-[13%] w-[7%] animate-wiggle"
        />
        <p className="animate-typing overflow-hidden whitespace-nowrap text-20 font-medium text-red-2 ">
          마음을 나누는 헌혈, NFT로 간직하세요
        </p>
      </div>

      <img src="mainBanner/wave2.png" className="absolute -bottom-10 w-full" />
    </div>
  );
}
