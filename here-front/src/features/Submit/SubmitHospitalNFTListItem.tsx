interface Iprops {
  name: string;
  registerDate: string;
  onClick: () => void;
  isSelected: boolean;
}

export default function SubmitHospitalNFTListItem({
  name,
  registerDate,
  onClick,
  isSelected,
}: Iprops) {
  return (
    <div
      className="flex h-130 w-210 flex-col justify-center gap-20 rounded-20 border-2 border-red-2 bg-white pt-20 pl-20 pb-20 text-18 shadow-sm"
      onClick={onClick}
    >
      <div className="flex gap-10">
        <img src="icons/person.png" className="h-25 w-25" />
        <div className="h-25 text-18 leading-25">{name}</div>
      </div>
      <div className="flex gap-10">
        <img src="icons/calendar.png" className="h-25 w-25" />
        <div className="h-25 text-18 leading-25">{registerDate}</div>
      </div>
      {isSelected && (
        <img
          src="/icons/check.svg"
          className="absolute top-0 right-20 h-25 w-25"
        ></img>
      )}
    </div>
  );
}
