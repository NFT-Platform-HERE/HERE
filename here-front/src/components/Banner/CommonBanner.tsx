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
    <div
      className="flex h-350 w-full flex-col items-center"
      css={[
        {
          minWidth: width,
        },
      ]}
    >
      <div
        className="w-full"
        css={[
          {
            backgroundColor: bgColor,
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
