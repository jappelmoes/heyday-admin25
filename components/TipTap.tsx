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
  Paragraph,
  Bold,
  Italic,
  Underline,
  Heading.configure({
    levels: [1, 2, 3],
  }),
  Image,
];

export default function TipTap({ content }: { content: string }) {
  const editor = useEditor({
    extensions,
    content,
    immediatelyRender: false,
  });

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      {/* Editor Toolbar and Media */}
      <div className="lg:w-80 space-y-4">
        <div className="sticky top-6">
          <MenuBar editor={editor!} />
        </div>
        <div className="sticky top-40">
          <MediaZone editor={editor!} />
        </div>
      </div>
      
      {/* Editor Content */}
      <div className="flex-1 min-w-0">
        <div className="prose prose-lg max-w-none">
          <EditorContent 
            editor={editor} 
            className="min-h-[600px] focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
