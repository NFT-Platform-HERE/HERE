interface Iprops {
  onClick: () => void;
}

export default function Background({ onClick }: Iprops) {
  return (
    <div
      className="fixed top-[50%] left-[50%] z-[25] h-full min-h-full w-full min-w-full translate-x-[-50%] translate-y-[-50%] bg-black bg-opacity-30"
      onClick={onClick}
    ></div>
  );
}
