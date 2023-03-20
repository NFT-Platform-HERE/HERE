import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

interface Iprops {
  onClick: () => void;
}

export default function Background({ onClick }: Iprops) {
  return (
    <div
      className="fixed top-0 z-20 h-full min-h-full w-full min-w-full bg-black bg-opacity-30"
      onClick={onClick}
    ></div>
  );
}
