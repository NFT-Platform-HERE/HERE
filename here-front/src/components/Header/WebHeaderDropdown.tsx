export default function WebHeaderDropdown() {
  return (
    <div className="flex h-250 w-200 flex-col items-center justify-center rounded-b-10 bg-white shadow-md">
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
