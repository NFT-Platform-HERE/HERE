interface Iprops {
  name: string;
  registerDate: string;
  onClick: () => void;
  isSelected: boolean;
}

export default function SubmitNFTListItem({
  name,
  registerDate,
  onClick,
  isSelected,
}: Iprops) {
  return (
    <div
      className="flex h-130 w-210 flex-col justify-between rounded-20 bg-pink-1 pt-20 pl-20 pb-20 text-18 shadow-sm"
      onClick={onClick}
    >
      <div>{name}</div>
      <div>{registerDate}</div>
      {isSelected && (
        <img
          src="/icons/check.svg"
          className="absolute top-0 right-20 h-25 w-25"
        ></img>
      )}
    </div>
  );
}
