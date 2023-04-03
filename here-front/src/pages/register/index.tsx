import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { QrScanner } from "@yudiel/react-qr-scanner";
import CommonBtn from "@/components/Button/CommonBtn";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import useRegisterPaperNftQuery from "@/apis/register/useRegisterPaperNftQuery";

export default function RegisterPage() {
  const [serialNumber, setSerialNumber] = useState<string>("");
  const [debugState, setDebugState] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const router = useRouter();

  const { memberId } = useSelector((state: RootState) => state.member);

  const { refetch } = useRegisterPaperNftQuery(memberId, serialNumber);

  const registerPaper = async () => {
    const value = await refetch();
    setDebugState(JSON.stringify(value));
    console.log("value", value);
    //if(openModal)
    // router.push("/my-nft");
  };

  const cancelRegister = () => {
    setSerialNumber("");
    setOpenModal(false);
  };

  const decode = (result: string) => {
    if (!openModal) {
      setSerialNumber(result);
    }
  };

  useEffect(() => {
    if (serialNumber) setOpenModal(true);
  }, [serialNumber]);

  return (
    <div className="flex w-full items-center justify-center mobile:h-[calc(100vh-60px)]">
      <div className="h-300 w-300 mobile:h-[100vw] mobile:w-full">
        <QrScanner
          onDecode={(result: string) => decode(result)}
          onError={(error) => console.log(error?.message)}
          containerStyle={{
            width: "100%",
            height: "100%",
          }}
          videoStyle={{ width: "100%", height: "100%" }}
        />
      </div>
      {openModal && (
        <div className="fixed top-[calc(50%-120px)] left-[calc(50%-150px)] z-30 rounded-20 border-2 border-red-2 bg-white">
          <div className="flex h-240 w-300 flex-col items-center justify-center">
            <div className="mb-30 text-18">등록하시겠습니까?</div>
            <div className="text-15">헌혈증 ID</div>
            <div className="text-15">{debugState}</div>
            <div className="text-15">{serialNumber}</div>
            <div className="mt-30 flex gap-20">
              <CommonBtn
                width={100}
                height={40}
                fontSize={15}
                isDisabled={false}
                onClick={registerPaper}
              >
                등록
              </CommonBtn>
              <CommonBtn
                width={100}
                height={40}
                fontSize={15}
                isDisabled={false}
                onClick={cancelRegister}
              >
                취소
              </CommonBtn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
