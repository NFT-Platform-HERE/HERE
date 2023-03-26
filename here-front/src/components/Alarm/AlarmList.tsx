interface Iprops {
  text: string;
  status: string;
  onClick: () => void;
}

export default function AlarmList({ text, status, onClick }: Iprops) {
  return (
    <>
      {status === "INACTIVE" ? (
        <div
          className="mx-auto my-5 flex min-h-40 w-320 cursor-pointer items-center rounded-10 bg-pen-00 py-8 px-10 text-14 font-light text-pen-2"
          onClick={onClick}
        >
          {text}
        </div>
      ) : (
        <div
          className="mx-auto my-5 flex min-h-40 w-320 cursor-pointer items-center rounded-10 bg-pink-1 py-8 px-10 text-14 font-light"
          onClick={onClick}
        >
          {text}
        </div>
      )}
    </>
  );
}
