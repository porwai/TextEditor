import React from "react";
import { IconButton } from "@mui/material";
import { FormatBold, FormatItalic, FormatUnderlined, Code, FormatQuote } from "@mui/icons-material";
import { useSlate } from 'slate-react';
import { isMarkActive, toggleMark, isBlockActive, toggleBlock } from "../utils/editorUtils";

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <IconButton
      style={{ color: isMarkActive(editor, format) ? "white" : "grey" }}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {icon}
    </IconButton>
  );
};

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <IconButton
      style={{ color: isBlockActive(editor, format) ? "white" : "grey" }}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {icon}
    </IconButton>
  );
};

const EditorToolbar = () => {
  return (
    <div style={{ display: `flex`, backgroundColor: "#171718" }}>
      <MarkButton format="bold" icon={<FormatBold />} />
      <MarkButton format="italic" icon={<FormatItalic />} />
      <MarkButton format="underline" icon={<FormatUnderlined />} />
      <MarkButton format="code" icon={<Code />} />
      <BlockButton format="block-quote" icon={<FormatQuote />} />
    </div>
  );
};

export default EditorToolbar;