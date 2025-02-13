"use client";

import { Editor } from "@tiptap/react";

export default function MenuBar({editor}: {editor: Editor}) {
  // const { editor } = useCurrentEditor();

  if (!editor) return null;

  return (
    <div className="bg-gray-100 rounded-2xl p-4">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex gap-2">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            // className="btn btn-outline btn-sm"
            className={`btn ${editor.isActive('bold') ? 'btn-primary' : 'btn-outline'} btn-sm`}
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            // className="btn btn-outline btn-sm"
            className={`btn ${editor.isActive('italic') ? 'btn-primary' : 'btn-outline'} btn-sm`}
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            // className="btn btn-outline btn-sm"
            className={`btn ${editor.isActive('underline') ? 'btn-primary' : 'btn-outline'} btn-sm`}
          >
            Underline
          </button>
          {/* <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            className="btn btn-sm btn-outline"
          >
            Code
          </button> */}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={`btn ${editor.isActive("paragraph") ? "btn-primary" : "btn-outline"} btn-sm`}
          >
            p
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={`btn ${editor.isActive("heading", { level: 1 }) ? "btn-primary" : "btn-outline"} btn-sm`}
          >
            H1
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`btn ${editor.isActive("heading", { level: 2 }) ? "btn-primary" : "btn-outline"} btn-sm`}
          >
            H2
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={`btn ${editor.isActive("heading", { level: 3 }) ? "btn-primary" : "btn-outline"} btn-sm`}
          >
            H3
          </button>
          {/* <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
            className={`btn btn-outline btn-sm ${
              editor.isActive("heading", { level: 4 }) ? "is-active" : ""
            }`}
          >
            H4
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 5 }).run()
            }
            className={`btn btn-outline btn-sm ${
              editor.isActive("heading", { level: 5 }) ? "is-active" : ""
            }`}
          >
            H5
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 6 }).run()
            }
            className={`btn btn-outline btn-sm ${
              editor.isActive("heading", { level: 6 }) ? "is-active" : ""
            }`}
          >
            H6
          </button> */}
        </div>
        {/* <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          Bullet list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          Ordered list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "is-active" : ""}
        >
          Code block
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
        >
          Blockquote
        </button> */}
        {/* <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          Horizontal rule
        </button>
        <button onClick={() => editor.chain().focus().setHardBreak().run()}>
          Hard break
        </button> */}
        <div className="flex gap-2">
          {/* <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            className="btn btn-outline btn-sm"
          >
            Undo
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            className="btn btn-outline btn-sm"
          >
            Redo
          </button> */}
        </div>
        <div className="flex gap-2">
          {/* <button
            onClick={() => editor.chain().focus().setColor("#958DF1").run()}
            className={`btn btn-outline btn-sm ${
              editor.isActive("textStyle", { color: "#958DF1" })
                ? "is-active"
                : ""
            }`}
          >
            Intro
          </button>
          <button
            onClick={() => editor.chain().focus().setColor("#958DF1").run()}
            className={`btn btn-outline btn-sm ${
              editor.isActive("textStyle", { color: "#958DF1" })
                ? "is-active"
                : ""
            }`}
          >
            Scope 1
          </button>
          <button
            onClick={() => editor.chain().focus().setColor("#958DF1").run()}
            className={`btn btn-outline btn-sm ${
              editor.isActive("textStyle", { color: "#958DF1" })
                ? "is-active"
                : ""
            }`}
          >
            Scope 2
          </button>
          <button
            onClick={() => editor.chain().focus().setColor("#958DF1").run()}
            className={`btn btn-outline btn-sm ${
              editor.isActive("textStyle", { color: "#958DF1" })
                ? "is-active"
                : ""
            }`}
          >
            Scope 3
          </button> */}
          <button
            onClick={() => editor.commands.setImage({ src: "https://plus.unsplash.com/premium_photo-1675864662977-25121af608fb?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" })}
          >
            Image
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => editor.chain().focus().unsetAllMarks().run()}
            className="btn btn-outline btn-sm"
          >
            Clear marks
          </button>
          <button
            onClick={() => editor.chain().focus().clearNodes().run()}
            className="btn btn-error btn-sm"
          >
            Clear nodes
          </button>
        </div>
        <button
          onClick={() => {
            const json = editor.getJSON();
            console.log(json);
            const blob = new Blob([JSON.stringify(json)], {
              type: "application/json",
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "editor-content.json";
            a.click();
            URL.revokeObjectURL(url);

            editor.commands.setContent({
              type: "doc",
              content: json.content,
            });
          }}
          className="btn btn-warning btn-sm"
        >
          Export as JSON
        </button>
      </div>
    </div>
  );
}