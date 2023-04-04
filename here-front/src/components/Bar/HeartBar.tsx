interface Iprops {
  width: number;
  height: number;
  fontSize: number;
  percent: number;
}

export default function HeartBar({ width, height, fontSize, percent }: Iprops) {
  return (
    <div
      className="relative rounded-20 bg-white font-bold text-red-2 shadow-md"
      css={[
        {
          width: width,
          height: height,
          fontSize: fontSize,
        },
      ]}
    >
      <div
        className="rounded-20 bg-red-2"
        css={[
          {
            width: (width * percent) / 100,
            height: height,
          },
        ]}
      ></div>
      <div
        className="absolute flex flex-col items-center bg-transparent"
        css={[
          {
            width: height * 6,
            height: height * 3,
            left: (width * percent) / 100 - height * 3,
            top: -height,
          },
        ]}
      >
        <img
          src="/icons/heart.svg"
          css={[
            {
              width: height * 3,
              height: height * 3,
            },
          ]}
        />
        {percent}%
      </div>
    </div>
  );
}
