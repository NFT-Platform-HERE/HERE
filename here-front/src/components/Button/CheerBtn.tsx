interface Iprops {
  width: number;
  height: number;
  fontSize: number;
  count: number;
  imgUrl: string;
  children: string;
  isChecked: boolean;
  onClick: () => void;
}

export default function CheerBtn({
  width,
  height,
  fontSize,
  count,
  imgUrl,
  children,
  isChecked,
  onClick,
}: Iprops) {
  return (
    <button
      className={
        isChecked
          ? "flex items-center justify-between rounded-50 border-2 border-red-1 bg-red-1 px-18 font-medium text-white hover:border-3"
          : "flex items-center justify-between rounded-50 border-2 border-red-1 bg-white px-18 font-medium text-red-2 hover:border-3"
      }
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
        <img src={imgUrl} className="mr-6 h-40 w-40"></img>
        {children}
      </div>{" "}
      {count}명
    </button>
  );
}
