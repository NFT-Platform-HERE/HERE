export default function MobileHeaderProfileDropdown() {
  return (
    <div className="flex h-250 w-full flex-col items-center justify-center bg-white shadow-sm">
      <div>
        <img src="/icons/character.svg" className="mt-10 h-120 w-120"></img>
      </div>
      <div className="mt-10 text-15">이경택</div>
      <div className="mt-10">
        <img src="/icons/alarm.svg"></img>
      </div>
      <div className="mt-10 text-15">LOGOUT</div>
    </div>
  );
}
