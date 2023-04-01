import CommonBtn from "@/components/Button/CommonBtn";
import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import DonateDateButton from "@/features/Donate/DonateDateButton";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import DonateTiptap from "@/features/Donate/DonateTiptap";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import useDonateWrite from "../../apis/donate/useDonateWrite";
import { useRouter } from "next/navigation";
import getDateString from "@/utils/getDateString";

export default function DonateWritePage() {
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState("");
  const [targetQuantity, setTargetQuantity] = useState<number>(1);
  const [deadLineDate, setDeadLineDate] = useState<Date>(new Date());

  const [formValid, setFormValid] = useState(false);

  const { memberId } = useSelector((state: RootState) => state.member);

  const mutation = useDonateWrite();

  const dateBtnRef = useRef<HTMLButtonElement>(null);

  const imageInputRef = useRef<HTMLInputElement>(null);

  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);

  const handleRemoveClick = (index: number) => () => {
    if (selectedFiles) {
      const dt = new DataTransfer();
      const newImagePreviewUrls = [...imagePreviewUrls];

      for (let i = 0; i < selectedFiles.length; i++) {
        if (i === index) {
          continue;
        }
        const file = selectedFiles[i];
        dt.items.add(file);
      }

      newImagePreviewUrls.splice(index, 1);

      setSelectedFiles(dt.files);
      setImagePreviewUrls(newImagePreviewUrls);
    }
  };

  const handleImageSelectButtonClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileList = event.target.files;
      setSelectedFiles(fileList);

      const urls = [];
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const imageUrl = URL.createObjectURL(file);
        urls.push(imageUrl);
      }
      setImagePreviewUrls(urls);
    }
  };

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
      deadline: getDateString(deadLineDate),
      content: description,
      memberId: memberId,
    };

    formData.append(
      "saveBoardRequestDto",
      new Blob([JSON.stringify(writeData)], { type: "application/json" }),
    );

    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append(`multipartFileList`, selectedFiles[i]);
      }
    }

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
            className="mb-5 w-950 text-20 text-pen-2 outline-none mobile:w-full mobile:text-16"
          />
          <div className="mb-15 h-1 w-full bg-gray-200"></div>
          <div className="mb-5 flex items-center justify-start">
            <div className="mr-31 text-18 font-normal text-pen-2 mobile:text-14">
              * 목표수량
            </div>
            <div className="mr-8 flex h-55 w-85 items-center justify-center rounded-60 border border-pen-0 text-18 font-normal text-pen-2 mobile:h-39 mobile:w-56 mobile:text-12">
              {targetQuantity}
            </div>
            <button onClick={handleTargetQuantityMinus}>
              <img
                src={"/icons/minus-circle-button.svg"}
                className="h-70 w-70 mobile:h-45 mobile:w-45"
              />
            </button>
            <button onClick={handleTargetQuantityPlus}>
              <img
                src={"/icons/add-circle-button.svg"}
                className="h-70 w-70 mobile:h-45 mobile:w-45"
              />
            </button>
          </div>
          <div className="mb-25 flex flex-wrap items-center justify-between">
            <div className="flex items-center justify-start mobile:mb-10">
              <div className="mr-31 text-18 font-normal text-pen-2 mobile:mr-15 mobile:w-80 mobile:text-14">
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
                      forwardedRef={dateBtnRef}
                      edit={true}
                    />
                  }
                />
              </div>
            </div>
            <button onClick={handleImageSelectButtonClick}>
              <div className="flex items-center justify-end">
                <img
                  src={"/icons/Img_box_duotone_line.svg"}
                  className="h-52 w-52 mobile:h-35 mobile:w-35"
                />
                <div className="ml-10 text-18 font-normal text-pen-2 mobile:text-14">
                  사진 첨부
                </div>
              </div>
            </button>
          </div>
          <input
            type="file"
            name="file"
            id="writeImage"
            accept="image/*"
            ref={imageInputRef}
            onChange={handleFileInput}
            hidden
            multiple
          />
          <DonateTiptap
            setDescription={setDescription}
            description={description}
          />
          <div className="mb-25 flex items-center justify-start">
            {selectedFiles &&
              imagePreviewUrls.map((imageUrl, index) => (
                <div className="relative mr-15 inline-block" key={index}>
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Image Preview ${index}`}
                    className="h-95 w-95 rounded-15"
                  />
                  <button onClick={handleRemoveClick(index)}>
                    <img
                      src="/icons/Dell.svg"
                      className="absolute top-5 right-5 h-25 w-25"
                    />
                  </button>
                </div>
              ))}
          </div>
          <p className="mb-30 w-510 text-16 font-light text-pen-1 mobile:mt-50 mobile:w-270 mobile:text-12">
            ※ 게시글 작성 이후 헌혈증 NFT 양도가 시작되면 ‘목표
            수량’,‘마감기한’을 수정할 수 없으니 신중하게 작성해주세요!
          </p>
        </div>
      </div>
    </div>
  );
}
