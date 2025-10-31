"use client";
import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Button, Flex } from "@radix-ui/themes";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: placeholder || "Schreibe hier...",
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  React.useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div style={{ border: "1px solid var(--gray-6)", borderRadius: 8, overflow: "hidden" }}>
      <Flex gap="1" p="2" style={{ borderBottom: "1px solid var(--gray-6)", background: "var(--gray-2)", flexWrap: "wrap" }}>
        <Button
          size="1"
          variant={editor.isActive("bold") ? "solid" : "soft"}
          onClick={() => editor.chain().focus().toggleBold().run()}
          type="button"
        >
          <strong>B</strong>
        </Button>
        <Button
          size="1"
          variant={editor.isActive("italic") ? "solid" : "soft"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          type="button"
        >
          <em>I</em>
        </Button>
        <Button
          size="1"
          variant={editor.isActive("heading", { level: 2 }) ? "solid" : "soft"}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          type="button"
        >
          H2
        </Button>
        <Button
          size="1"
          variant={editor.isActive("heading", { level: 3 }) ? "solid" : "soft"}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          type="button"
        >
          H3
        </Button>
        <Button
          size="1"
          variant={editor.isActive("bulletList") ? "solid" : "soft"}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          type="button"
        >
          • List
        </Button>
        <Button
          size="1"
          variant={editor.isActive("orderedList") ? "solid" : "soft"}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          type="button"
        >
          1. List
        </Button>
      </Flex>
      <div style={{ padding: "12px", minHeight: 200, maxHeight: 400, overflow: "auto" }}>
        <EditorContent editor={editor} />
      </div>
      <style jsx global>{`
        .ProseMirror {
          outline: none;
        }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: var(--gray-9);
          pointer-events: none;
          height: 0;
        }
        .ProseMirror h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.5em 0;
        }
        .ProseMirror h3 {
          font-size: 1.25em;
          font-weight: bold;
          margin: 0.5em 0;
        }
        .ProseMirror ul, .ProseMirror ol {
          padding-left: 1.5em;
          margin: 0.5em 0;
        }
        .ProseMirror strong {
          font-weight: bold;
        }
        .ProseMirror em {
          font-style: italic;
        }
      `}</style>
    </div>
  );
}
