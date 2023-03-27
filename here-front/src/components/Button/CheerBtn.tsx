interface Iprops {
  width: number;
  height: number;
  fontSize: number;
  count: number;
  imgUrl: string;
  children: string;
  onClick: () => void;
}

export default function CheerBtn({
  width,
  height,
  fontSize,
  count,
  imgUrl,
  children,
  onClick,
}: Iprops) {
  return (
    <button
      className="flex items-center justify-between rounded-50 bg-red-1 px-18 font-medium text-white hover:text-red-3"
      css={[
        {
          width: width,
          height: height,
          fontSize: fontSize,
        },
      ]}
      onClick={onClick}
    >
      <div className="flex items-center">
        <img src={imgUrl} className="mr-6 h-30 w-30"></img>
        {children}
      </div>{" "}
      {count}명
    </button>
  );
}
