import DatePicker from "react-datepicker";
import React, { forwardRef, useImperativeHandle, ForwardedRef } from "react";

interface Iprops {
  value: string;
  onClick: () => void;
  edit: boolean;
  forwardedRef: ForwardedRef<HTMLButtonElement>; // Define a separate type for the ref prop
}

const DonateDateButton = forwardRef<HTMLButtonElement, Iprops>(
  ({ value, onClick, forwardedRef, edit }, ref) => {
    if (edit) {
      return (
        <button
          type="button"
          onClick={onClick}
          ref={ref}
          className="mr-3 flex h-55 w-240 items-center justify-start rounded-60 border border-pen-0 text-18 font-normal text-pen-2 mobile:h-38 mobile:w-170 mobile:text-12"
        >
          <img
            src={"/icons/calendar.svg"}
            className="ml-15 mr-10 mb-5 h-38 w-38 mobile:ml-15 mobile:mr-12 mobile:h-23 mobile:w-23"
          />
          {value}
        </button>
      );
    } else {
      return (
        <button
          type="button"
          onClick={onClick}
          ref={ref}
          className="mr-3 flex h-55 w-240 items-center justify-start rounded-60 border border-pen-0 bg-pen-00 text-18 font-normal text-pen-2 mobile:h-38 mobile:w-170 mobile:text-12"
        >
          <img
            src={"/icons/calendar.svg"}
            className="ml-15 mr-10 mb-5 h-38 w-38 mobile:ml-15 mobile:mr-12 mobile:h-23 mobile:w-23"
          />
          {value}
        </button>
      );
    }
  },
);

export default DonateDateButton;
