"use client";

import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlock from "@tiptap/extension-code-block";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import History from "@tiptap/extension-history";
import React from "react";
import MenuBar from "./TipTapMenuBar";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor } from '@tiptap/react'
import MediaZone from "./MediaZone";

const extensions = [
  Document,
  Text,
  // Paragraph,
  // Color.configure({}),
  // TextStyle.configure({}),
  Paragraph,
  Bold,
  Italic,
  Underline,
  Heading.configure({
    levels: [1, 2, 3],
  }),
  // BulletList.configure({
  //   keepMarks: true,
  //   keepAttributes: false,
  // }),
  // OrderedList.configure({
  //   keepMarks: true,
  //   keepAttributes: false,
  // }),
  // Blockquote,
  // CodeBlock,
  // Link,
  Image,
  // Table,
  // History,
];

export default function TipTap({ content }: { content: string }) {
  const editor = useEditor({
    extensions,
    content,
  });

  return (
    <div className="flex h-full w-full gap-6">
      <div className="sticky top-0 h-screen mt-3 w-96">
        <MenuBar editor={editor!} />
        <MediaZone editor={editor!} />
      </div>
      <div className="w-96">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
