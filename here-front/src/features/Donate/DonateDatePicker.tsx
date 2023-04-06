import DatePicker from "react-datepicker";
import React, { forwardRef, ForwardedRef } from "react";
import DonateDateButton from "@/features/Donate/DonateDateButton";
import { ko } from "date-fns/locale";

interface Iprops {
  deadLineDate: Date;
  dateBtnRef: ForwardedRef<HTMLButtonElement>; // Define a separate type for the ref prop
  onChange: (date: Date) => void;
  //   onChange: React.ChangeEvent<HTMLInputElement>;
}

const DonateDatePicker = forwardRef<HTMLButtonElement, Iprops>(
  ({ dateBtnRef, deadLineDate, onChange }) => {
    return (
      <DatePicker
        selected={deadLineDate}
        dateFormat="yyyy년 MM월 dd일"
        onChange={onChange}
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
    );
  },
);

export default DonateDatePicker;
