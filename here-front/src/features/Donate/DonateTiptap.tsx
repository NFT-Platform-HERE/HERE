import { useEditor, EditorContent } from "@tiptap/react";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import StarterKit from "@tiptap/starter-kit";
import DonateTiptapMenu from "./DonateTiptapMenu";

const DonateTiptap = (props: any) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: props.content,
    editable: props.isEditable,
  });
  return (
    <div className="mb-70 h-332 w-920 rounded-15 border border-pen-0 p-16 mobile:w-350">
      <DonateTiptapMenu editor={editor} />
      <EditorContent
        editor={editor}
        ref={props.editorRef}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default DonateTiptap;
