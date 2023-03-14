interface Iprops {
  width: number;
  height: number;
  fontSize: number;
  isSelected: boolean;
  children: string;
  onClick: () => void;
}

export default function TabBtn({
  width,
  height,
  fontSize,
  isSelected,
  children,
  onClick,
}: Iprops) {
  return (
    <button
      className={
        isSelected
          ? "border-1 border-red-2 font-medium leading-20 text-red-2"
          : "border-1 border-pen-0 font-medium leading-20"
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
      {children}
    </button>
  );
}
