interface Iprops {
  width: number;
  height: number;
  fontSize: number;
  children: string;
  isDisabled: boolean;
  onClick: () => void;
}

export default function CommonBtn({
  width,
  height,
  fontSize,
  children,
  isDisabled,
  onClick,
}: Iprops) {
  return (
    <button
      disabled={isDisabled}
      className="rounded-10 border-3 border-red-2 bg-white font-semibold leading-20 text-red-2 disabled:border-red-0 disabled:bg-white disabled:text-red-0 hover:enabled:bg-red-2 hover:enabled:text-white"
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
    </button>
  );
}
