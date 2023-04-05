import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import DonateTiptapMenu from "./DonateTiptapMenu";
import Underline from "@tiptap/extension-underline";

const DonateTiptap = ({ setDescription, description }: any) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: description,

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setDescription(html);
    },
  });

  return (
    <>
      <div className="textEditor">
        <DonateTiptapMenu editor={editor} />
        <EditorContent editor={editor} />
      </div>
      <style jsx={undefined}>{`
        .ProseMirror {
          padding: 10px;
          border-top: 1px solid #d9d9d9;
          background: white;
          border-radius: 0 0 5px 5px;
          height: 310px;
          overflow-x: hidden;
          overflow-y: auto;
        }
        .ProseMirror:focus {
          border: none;
          outline: 2px solid #e5e5e5;
        }

        .ProseMirror > * + * {
          margin-top: 0.75em;
        }

        .ProseMirror ul,
        .ProseMirror ol {
          padding: 0 2rem;
        }

        .ProseMirror h1,
        .ProseMirror h2,
        .ProseMirror h3,
        .ProseMirror h4,
        .ProseMirror h5,
        .ProseMirror h6 {
          line-height: 1.1;
        }

        .ProseMirror code {
          background-color: rgba(#616161, 0.1);
          color: #616161;
        }

        .ProseMirror pre {
          background: #0d0d0d;
          color: #fff;
          font-family: "JetBrainsMono", monospace;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
        }
        .ProseMirror code {
          color: inherit;
          padding: 0;
          background: none;
          font-size: 0.8rem;
        }

        .ProseMirror img {
          max-width: 100%;
          height: auto;
        }

        .ProseMirror blockquote {
          padding-left: 1rem;
          border-left: 3px solid #999999;
        }

        .ProseMirror hr {
          border: none;
          border-top: 3px solid #999999;
          margin: 2rem 0;
        }

        .textEditor {
          border-radius: 5px;
          border: 1px solid #d9d9d9;
        }

        .ProseMirror::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }
        .ProseMirror::-webkit-scrollbar-thumb {
          background-color: #9f9f9f;
          border-radius: 30px;
        }
        .ProseMirror::-webkit-scrollbar-track {
          background-color: #e5e5e5;
        }
      `}</style>
    </>
  );
};

export default DonateTiptap;
