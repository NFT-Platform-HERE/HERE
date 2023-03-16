interface Iprops {
  width: number;
  height: number;
  marginTop: number;
  bgColor: string;
  imgUrl: string;
}

export default function CommonBanner({
  width,
  height,
  marginTop,
  bgColor,
  imgUrl,
}: Iprops) {
  return (
    <div className="flex h-350 w-full flex-col items-center">
      <div
        className="h-300 w-full"
        css={[
          {
            backgroundColor: bgColor,
            minWidth: width,
            height: height,
          },
        ]}
      ></div>
      <div
        css={[
          {
            width: width,
            height: height,
            marginTop: -(height - marginTop) + "px",
          },
        ]}
      >
        <img
          src={imgUrl}
          css={[
            {
              width: width,
              height: height,
            },
          ]}
        />
      </div>
    </div>
  );
}
