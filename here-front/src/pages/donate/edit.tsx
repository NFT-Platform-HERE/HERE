import CommonBtn from "@/components/Button/CommonBtn";
import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import DonateDateButton from "@/features/Donate/DonateDateButton";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import DonateTiptap from "@/features/Donate/DonateTiptap";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { useRouter } from "next/navigation";
import getDateString from "@/utils/getDateString";
import useDonateUpdate from "@/apis/donate/useDonateUpdate";

export default function DonateEditPage() {
  const router = useRouter();

  const donateInfo = useSelector((state: RootState) => state.donate);

  const { memberId } = useSelector((state: RootState) => state.member);

  const [title, setTitle] = useState<string>(donateInfo.title);
  const [description, setDescription] = useState(donateInfo.content);
  const [targetQuantity, setTargetQuantity] = useState<number>(
    donateInfo.goalQuantity,
  );
  const [deadLineDate, setDeadLineDate] = useState<Date>(
    new Date(donateInfo.deadline),
  );

  const [formValid, setFormValid] = useState(false);

  const dateBtnRef = useRef<HTMLButtonElement>(null);

  const imageInputRef = useRef<HTMLInputElement>(null);

  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);

  const mutation = useDonateUpdate();

  function makeFormData() {
    const formData = new FormData();

    console.log("memberId", donateInfo.memberId);
    console.log("boardId", donateInfo.boardId);

    if (donateInfo.curQuantity > 0) {
      const editData = {
        title: title.trim(),
        content: description,
        writerId: memberId,
        boardId: donateInfo.boardId,
      };

      formData.append(
        "updateBoardRequestDto",
        new Blob([JSON.stringify(editData)], { type: "application/json" }),
      );
    } else {
      const editData = {
        title: title.trim(),
        goalQuantity: targetQuantity,
        deadline: getDateString(deadLineDate),
        content: description,
        writerId: memberId,
        boardId: donateInfo.boardId,
      };

      formData.append(
        "updateBoardRequestDto",
        new Blob([JSON.stringify(editData)], { type: "application/json" }),
      );
    }

    const updateBoardImgObjectList = [];
    const ordersList: number[] = [];

    for (let index = 0; index < imagePreviewUrls.length; index++) {
      const searchResult = donateInfo.boardImgUrlList.find(
        (obj) => obj.imgUrl === imagePreviewUrls[index],
      );

      if (searchResult) {
        updateBoardImgObjectList.push({
          boardImgId: searchResult.boardImgId,
          orders: index,
        });
      } else {
        ordersList.push(index);
      }
    }

    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append(`multipartFileList`, selectedFiles[i]);
      }
    }

    formData.append(
      `ordersList`,
      new Blob([JSON.stringify(ordersList)], { type: "application/json" }),
    );

    formData.append(
      `updateBoardImgObjectList`,
      new Blob([JSON.stringify(updateBoardImgObjectList)], {
        type: "application/json",
      }),
    );

    return formData;
  }

  function handleEditButton() {
    donateEdit();
  }

  async function donateEdit() {
    const formData = makeFormData();

    try {
      const donateEditeResult = await mutation.mutateAsync(formData);
      console.log(donateEditeResult);
      goToDetailPage();
    } catch (error) {
      console.error(error);
    }
  }

  const handleRemoveClick = (index: number) => () => {
    const searchResult = donateInfo.boardImgUrlList.find(
      (obj) => obj.imgUrl === imagePreviewUrls[index],
    );

    if (searchResult) {
      const newImagePreviewUrls = [...imagePreviewUrls];
      newImagePreviewUrls.splice(index, 1);
      setImagePreviewUrls(newImagePreviewUrls);
    } else {
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
    }
  };

  const handleImageSelectButtonClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileList: FileList = event.target.files;
      if (selectedFiles) {
        const dt = new DataTransfer();

        for (let i = 0; i < selectedFiles.length; i++) {
          const file = selectedFiles[i];
          dt.items.add(file);
        }

        for (let i = 0; i < fileList.length; i++) {
          const file = fileList[i];
          dt.items.add(file);
        }

        setSelectedFiles(dt.files);
      } else {
        setSelectedFiles(fileList);
      }

      const urls: string[] = [];
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const imageUrl = URL.createObjectURL(file);
        urls.push(imageUrl);
      }

      setImagePreviewUrls([...imagePreviewUrls, ...urls]);
    }
  };

  const validateForm = () => {
    if (title.length > 0 && description.length > 0) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  function goToDetailPage() {
    router.push(`/donate/${donateInfo.boardId}`);
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

  useEffect(() => {
    const previewImageList = [];

    for (let index = 0; index < donateInfo.boardImgUrlList.length; index++) {
      previewImageList.push(donateInfo.boardImgUrlList[index].imgUrl);
    }

    setImagePreviewUrls(previewImageList);
  }, []);

  return (
    <div className="mt-25 w-full">
      <div className="mx-auto w-1200 mobile:w-360">
        <div className="mx-auto w-950 mobile:w-340">
          <div className="mt-15 mb-15 mr-15 flex justify-end mobile:hidden ">
            <CommonBtn
              width={95}
              height={50}
              fontSize={20}
              children={"수정"}
              isDisabled={!formValid}
              onClick={handleEditButton}
            />
          </div>
          <div className="mt-5 mb-15 hidden justify-end mobile:flex">
            <CommonBtn
              width={73}
              height={34}
              fontSize={14}
              children={"수정"}
              isDisabled={!formValid}
              onClick={handleEditButton}
            />
          </div>
          <input
            type="text"
            value={title}
            onChange={handleTitleInputChange}
            placeholder="제목을 입력하세요"
            className="mb-5 w-950 text-20 text-pen-2 outline-none mobile:w-full mobile:text-16"
          />
          <div className="mb-15 h-1 w-full bg-gray-200"></div>
          <div className="mb-5 flex items-center justify-start">
            <div className="mr-31 text-18 font-normal text-pen-2 mobile:text-14">
              * 목표수량
            </div>
            {donateInfo.curQuantity > 0 ? (
              <div className="mr-8 flex h-55 w-85 items-center justify-center rounded-60 border border-pen-0 bg-pen-00 text-18 font-normal text-pen-2 mobile:h-39 mobile:w-56 mobile:text-12">
                {targetQuantity}
              </div>
            ) : (
              <div className="mr-8 flex h-55 w-85 items-center justify-center rounded-60 border border-pen-0 text-18 font-normal text-pen-2 mobile:h-39 mobile:w-56 mobile:text-12">
                {targetQuantity}
              </div>
            )}
            <button
              disabled={donateInfo.curQuantity > 0 ? true : false}
              onClick={handleTargetQuantityMinus}
            >
              <img
                src={"/icons/minus-circle-button.svg"}
                className="h-70 w-70 mobile:h-45 mobile:w-45"
              />
            </button>
            <button
              disabled={donateInfo.curQuantity > 0 ? true : false}
              onClick={handleTargetQuantityPlus}
            >
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

              {donateInfo.curQuantity > 0 ? (
                <div className="flex-auto">
                  <DatePicker
                    selected={deadLineDate}
                    disabled={donateInfo.curQuantity > 0 ? true : false}
                    dateFormat="yyyy년 MM월 dd일"
                    onChange={(date: Date) => setDeadLineDate(date)}
                    minDate={new Date()}
                    locale={ko}
                    customInput={
                      <DonateDateButton
                        value={deadLineDate.toString()}
                        onClick={() => {}}
                        forwardedRef={dateBtnRef}
                        edit={false}
                      />
                    }
                  />
                </div>
              ) : (
                <div className="flex-auto">
                  <DatePicker
                    selected={deadLineDate}
                    disabled={donateInfo.curQuantity > 0 ? true : false}
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
              )}
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
            {imagePreviewUrls.map((imageUrl, index) => (
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
