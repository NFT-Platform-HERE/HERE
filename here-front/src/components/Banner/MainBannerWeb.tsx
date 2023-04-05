export default function MainBannerWeb() {
  return (
    <div className="relative h-550 w-full min-w-[1200px] bg-[#F6EAEA]">
      <div className="mx-auto h-500 w-[1200px] ">
        <img
          src="mainBanner/mainImg.png"
          className="absolute top-50 -left-60 inline-block w-[60%] max-w-[800px]"
        />
        <img
          src="mainBanner/fullName.png"
          className="absolute right-[410px] top-100 w-200"
        />
        <img
          src="mainBanner/name.png"
          className="absolute top-100 right-60 w-700"
        />
        {/* <img src="mainBanner/heart1.png" alt="" /> */}
        {/* <img src="mainBanner/heart2.png" alt="" /> */}
      </div>
      <img src="mainBanner/wave.png" className="absolute -bottom-10" />
    </div>
  );
}
