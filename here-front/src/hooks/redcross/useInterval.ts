import { useEffect, useRef } from "react";

const useInterval = (callback: () => void, delay: number): void => {
  //* 최근에 들어온 callback을 저장할 ref
  const savedCallback = useRef<() => void>();

  //* ref를 업데이트
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  //* delay가 바뀔 때마다 새로 실행된다.
  useEffect(() => {
    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };

    // * delay에 맞추어 interval을 새로 실행시킨다.
    const id = setInterval(tick, delay);

    //* unmount될 때 clearInterval을 해준다.
    return () => {
      clearInterval(id);
    };
  }, [delay]);
};

export default useInterval;
