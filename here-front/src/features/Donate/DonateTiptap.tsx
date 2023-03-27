import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import DonateTiptapMenu from "./DonateTiptapMenu";
import Underline from "@tiptap/extension-underline";

const DonateTiptap = ({ setDescription }: any) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: ``,

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setDescription(html);
    },
  });

  return (
    <>
      <div className="mb-70 h-332 w-920 rounded-15 border border-pen-0 p-16 mobile:w-350">
        <DonateTiptapMenu editor={editor} />
        <EditorContent
          editor={editor}
          className="h-300 border-t-1 border-pen-0 p-5 "
        />
      </div>
    </>
  );
};

export default DonateTiptap;
