import {
  FaBold,
  FaHeading,
  FaItalic,
  FaListOl,
  FaListUl,
  FaQuoteLeft,
  FaStrikethrough,
  FaUnderline,
} from "react-icons/fa";

export default function DonateTiptapMenu({ editor }: any) {
  if (!editor) return null;
  return (
    <>
      <div className="menuBar">
        <div>
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is_active" : ""}
          >
            <FaBold />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is_active" : ""}
          >
            <FaItalic />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive("underline") ? "is_active" : ""}
          >
            <FaUnderline />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is_active" : ""}
          >
            <FaStrikethrough />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "is_active" : ""
            }
          >
            <FaHeading />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive("heading", { level: 3 }) ? "is_active" : ""
            }
          >
            <FaHeading className="heading3" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is_active" : ""}
          >
            <FaListUl />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "is_active" : ""}
          >
            <FaListOl />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive("blockquote") ? "is_active" : ""}
          >
            <FaQuoteLeft />
          </button>
        </div>
      </div>
      <style jsx={undefined}>{`
        .menuBar {
          padding-bottom: 5px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .menuBar button {
          font-size: 18px;
          margin: 7px;
          margin-right: 15px;
          outline: none;
          border: none;
          background: none;
          color: rgb(70, 70, 70);
          cursor: pointer;
        }
        .menuBar button:last-child {
          margin-right: 7px;
        }

        .heading3 {
          font-size: 15px;
        }

        button.is_active {
          background: rgb(197, 197, 197);
          padding: 2px 3px;
          border-radius: 2px;
        }
      `}</style>
    </>
  );
}
