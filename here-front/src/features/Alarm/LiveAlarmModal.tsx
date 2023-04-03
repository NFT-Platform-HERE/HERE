import { RootState } from "@/stores/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function LiveAlarmModal() {
  const [isOpen, setOpen] = useState<boolean>(false);

  const memberId = useSelector((state: RootState) => state.member.memberId);

  useEffect(() => {
    const sseEvents = new EventSource(
      `https://j8b209.p.ssafy.io:9013/api/notification/subscribe/${memberId}`,
    );

    sseEvents.onopen = function () {
      console.log("SSE 연결!!");
    };
    sseEvents.onerror = function (error) {
      console.log("SSE 에러", error);
      sseEvents.close();
    };
    sseEvents.onmessage = function (stream) {
      if (stream.data.split(" ")[0] !== "EventStream") {
        setOpen(true);
        console.log("SSE 데이터", stream.data);
      }
    };

    return () => {
      sseEvents.close();
    };
  }, []);

  return (
    <div
      className={
        (isOpen
          ? "visible translate-x-300 duration-1000 ease-out "
          : "invisible ") +
        "fixed bottom-20 -left-250 z-100 flex h-70 w-300 cursor-pointer items-center justify-center rounded-10 bg-red-2 text-18 font-medium text-white"
      }
      onClick={() => setOpen(false)}
    >
      새로운 알림이 도착했습니다.
    </div>
  );
}
