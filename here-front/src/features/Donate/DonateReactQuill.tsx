import { useRef, useMemo } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import * as React from "react";

interface Iprops {
  value: string;
  onChange: (id: string) => void;
}

function DonateReactQuill({ value, onChange }: Iprops) {
  const quillRef = React.useRef<ReactQuill>(null);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: "1" }, { header: "2" }],
          [{ size: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
          ["image"],
        ],
        // handlers: { image: imageHandler },
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    [],
  );

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "align",
    "image",
  ];

  return (
    <ReactQuill
      theme="snow"
      ref={quillRef}
      value={value}
      onChange={onChange}
      modules={modules}
      placeholder={"내용을 입력하세요"}
      className="mb-70 h-332 w-920 mobile:w-350"
    />
  );
}

export default DonateReactQuill;
