interface Iprops {
  bgColor: string;
  imgUrl: string;
}

export default function CommonBanner({ bgColor, imgUrl }: Iprops) {
  return (
    <div className="flex h-350 w-full flex-col items-center">
      <div
        className="h-300 w-full min-w-[1200px]"
        css={[
          {
            backgroundColor: bgColor,
          },
        ]}
      ></div>
      <div className="-mt-[250px] h-300 w-[1200px]">
        <img src={imgUrl} className="h-300 w-[1200px]" />
      </div>
    </div>
  );
}
