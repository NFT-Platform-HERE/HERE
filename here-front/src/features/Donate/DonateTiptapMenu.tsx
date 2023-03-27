import { MdFormatBold } from "react-icons/md";
export default function DonateTiptapMenu({ editor }: any) {
  if (!editor) return null;
  return (
    <div>
      <MdFormatBold
        size={20}
        cursor={"pointer"}
        onClick={() => editor.chain().focus().toggleBold().run()}
        style={{ color: editor.isActive("bold") ? "orange" : "black" }}
      />
    </div>
  );
}
