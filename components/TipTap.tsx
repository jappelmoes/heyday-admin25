"use client";

import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

export default function TipTap({ content }: { content: string }) {
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: content,
  });

  return <EditorContent editor={editor} />;
}
