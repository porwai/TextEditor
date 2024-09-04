import React from "react";
import { IconButton } from "@mui/material";
import { FormatBold, FormatItalic, FormatUnderlined, Code, FormatQuote} from "@mui/icons-material";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
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
      <BlockButton format="heading-one" icon={<LooksOneIcon />} />
      <BlockButton format="heading-two" icon={<LooksTwoIcon />}/>
      <BlockButton format="block-quote" icon={<FormatQuote />} />
      <BlockButton format="numbered-list" icon={<FormatListNumberedIcon />} />
      <BlockButton format="bulleted-list" icon={<FormatListBulletedIcon />} />
      <BlockButton format="left" icon={<FormatAlignLeftIcon />} />
      <BlockButton format="center" icon={<FormatAlignCenterIcon />} />
      <BlockButton format="right" icon={<FormatAlignRightIcon />} />
      <BlockButton format="justify" icon={<FormatAlignJustifyIcon />} />
    </div>
  );
};

export default EditorToolbar;