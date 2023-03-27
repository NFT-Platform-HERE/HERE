interface Iprops {
  width: number;
  height: number;
  fontSize: number;
  percent: number;
}

export default function CommonBar({
  width,
  height,
  fontSize,
  percent,
}: Iprops) {
  return (
    <div
      className="flex items-center gap-10 overflow-hidden rounded-20 bg-white font-bold text-red-2 shadow-md"
      css={[
        {
          width: width,
          height: height,
          fontSize: fontSize,
        },
      ]}
    >
      <div
        className="bg-red-2"
        css={[
          {
            width: (width * percent) / 100,
            height: height,
          },
        ]}
      >
        {percent > 80 && (
          <div
            className="text-center text-white"
            css={[
              {
                lineHeight: height + "px",
              },
            ]}
          >
            {percent}%
          </div>
        )}
      </div>
      {percent <= 80 && <div>{percent}%</div>}
    </div>
  );
}
