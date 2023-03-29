import CommonBtn from "@/components/Button/CommonBtn";
import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import DonateDateButton from "@/features/Donate/DonateDateButton";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import DonateTiptap from "@/features/Donate/DonateTiptap";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import useDonateWriteQuery from "./../../apis/donate/useDonateWriteQuery";
import { useRouter } from "next/navigation";

export default function DonateWritePage() {
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState("");
  const [targetQuantity, setTargetQuantity] = useState<number>(1);
  const [deadLineDate, setDeadLineDate] = useState<Date>(new Date());

  const [formValid, setFormValid] = useState(false);

  const { memberId } = useSelector((state: RootState) => state.member);

  const mutation = useDonateWriteQuery();

  const ref = useRef<HTMLButtonElement>(null);

  const validateForm = () => {
    if (title.length > 0 && description.length > 0) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  function handleRegisterButton() {
    writeArticle();
  }

  function goToWritePage() {
    router.push("/donate");
  }

  function makeFormData() {
    const formData = new FormData();

    const writeData = {
      title: title.trim(),
      goalQuantity: targetQuantity,
      deadline: deadLineDate,
      content: description,
      memberId: memberId,
    };

    formData.append(
      "saveBoardRequestDto",
      new Blob([JSON.stringify(writeData)], { type: "application/json" }),
    );

    return formData;
  }

  async function writeArticle() {
    const formData = makeFormData();

    try {
      const donateWriteResult = await mutation.mutateAsync(formData);
      console.log(donateWriteResult);
      goToWritePage();
    } catch (error) {
      console.error(error);
    }
  }

  const handleTitleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    console.log("event.target.value", event.target.value);
    setTitle(event.target.value);
  };

  function handleTargetQuantityPlus() {
    setTargetQuantity(targetQuantity + 1);
  }

  function handleTargetQuantityMinus() {
    if (targetQuantity > 1) {
      setTargetQuantity(targetQuantity - 1);
    }
  }

  useEffect(() => {
    validateForm();
  }, [title, description]);

  return (
    <div className="mt-25 w-full">
      <div className="mx-auto w-1200 mobile:w-360">
        <div className="mx-auto w-950 mobile:w-340">
          <div className="mt-15 mb-15 mr-15 flex justify-end mobile:hidden ">
            <CommonBtn
              width={95}
              height={50}
              fontSize={20}
              children={"등록"}
              isDisabled={!formValid}
              onClick={handleRegisterButton}
            />
          </div>
          <div className="mt-5 mb-15 hidden justify-end mobile:flex">
            <CommonBtn
              width={73}
              height={34}
              fontSize={14}
              children={"등록"}
              isDisabled={!formValid}
              onClick={handleRegisterButton}
            />
          </div>
          <input
            type="text"
            onChange={handleTitleInputChange}
            placeholder="제목을 입력하세요"
            className="mb-5 text-20 text-pen-2 outline-none mobile:text-13"
          />
          <div className="mb-15 h-1 w-full bg-gray-200"></div>
          <div className="mb-5 flex items-center justify-start">
            <div className="mr-31 text-18 font-normal text-pen-2 mobile:text-14">
              * 목표수량
            </div>
            <div className="mr-8 flex h-55 w-85 items-center justify-center rounded-60 border border-pen-0 text-18 font-normal text-pen-2 mobile:h-39 mobile:w-56 mobile:text-12">
              {targetQuantity}
            </div>
            <img
              src={"/icons/minus-circle-button.svg"}
              onClick={handleTargetQuantityMinus}
              className="h-70 w-70 mobile:h-45 mobile:w-45"
            />
            <img
              src={"/icons/add-circle-button.svg"}
              onClick={handleTargetQuantityPlus}
              className="h-70 w-70 mobile:h-45 mobile:w-45"
            />
          </div>
          <div className="mb-25 flex items-center justify-start">
            <div className="mr-31 text-18 font-normal text-pen-2 mobile:text-14">
              * 마감기한
            </div>
            <div className="flex-auto">
              <DatePicker
                selected={deadLineDate}
                dateFormat="yyyy년 MM월 dd일"
                onChange={(date: Date) => setDeadLineDate(date)}
                minDate={new Date()}
                locale={ko}
                customInput={
                  <DonateDateButton
                    value={deadLineDate.toString()}
                    onClick={() => {}}
                    forwardedRef={ref}
                  />
                }
              />
            </div>
          </div>
          <DonateTiptap setDescription={setDescription} />
          <p className="mb-30 w-510 text-16 font-light text-pen-1 mobile:mt-50 mobile:w-270 mobile:text-12">
            ※ 게시글 작성 이후 헌혈증 NFT 양도가 시작되면 ‘목표
            수량’,‘마감기한’을 수정할 수 없으니 신중하게 작성해주세요!
          </p>
        </div>
      </div>
    </div>
  );
}
