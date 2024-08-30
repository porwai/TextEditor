import React from "react";
import { IconButton } from "@mui/material";
import { FormatBold, FormatItalic, FormatUnderlined, Code, FormatQuote } from "@mui/icons-material";

const EditorToolbar = ({ onBold, onItalic, onUnderline, onCode, onQuote }) => {
  return (
    <div style={{ display: `flex`, backgroundColor: "#171718" }}>
      <IconButton style={{ color: "grey" }} onPointerDown={onBold}>
        <FormatBold />
      </IconButton>
      <IconButton style={{ color: "grey" }} onPointerDown={onItalic}>
        <FormatItalic />
      </IconButton>
      <IconButton style={{ color: "grey" }} onPointerDown={onUnderline}>
        <FormatUnderlined />
      </IconButton>
      <IconButton style={{ color: "grey" }} onPointerDown={onCode}>
        <Code />
      </IconButton>
      <IconButton style={{ color: "grey" }} onPointerDown={onQuote}>
        <FormatQuote />
      </IconButton>
    </div>
  );
};

export default EditorToolbar;
