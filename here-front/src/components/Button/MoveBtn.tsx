interface Iprops {
  width: number;
  height: number;
  fontSize: number;
  children: string;
  onClick: () => void;
}

export default function MoveBtn({
  width,
  height,
  children,
  fontSize,
  onClick,
}: Iprops) {
  return (
    <button
      className="flex items-center justify-center rounded-30 bg-red-1 font-semibold leading-20 text-white"
      css={[
        {
          width: width,
          height: height,
          fontSize: fontSize,
        },
      ]}
      onClick={onClick}
    >
      {children}
      <img
        src="/icons/right-white-vector.svg"
        className="ml-15"
        css={[
          {
            width: height - 18,
            height: height - 18,
          },
        ]}
      />
    </button>
  );
}
