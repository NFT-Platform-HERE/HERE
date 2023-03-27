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
      className="font-regular flex items-center justify-center rounded-30 bg-red-1 leading-20 text-white"
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
        className="ml-5"
        css={[
          {
            width: height / 3 + 3,
            height: height / 3 + 3,
          },
        ]}
      />
    </button>
  );
}
