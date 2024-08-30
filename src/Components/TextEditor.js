// components/TextEditor.js
import React, { useCallback } from "react";
import { Editable } from "slate-react";
import { IconButton } from "@mui/material";
import { FormatBold, FormatItalic, FormatUnderlined, Code, FormatQuote } from "@mui/icons-material";

import Leaf from "./Leaf";
import { BlockQuote, CodeElement, DefaultElement } from "./Elements";
import { changeMark, toggleBlock } from "../utils/editorUtils";

function TextEditor({ editor }) {
  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      case "quote":
        return <BlockQuote {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  const onKeyDown = (event) => {
    if (!event.ctrlKey) {
      return;
    }

    event.preventDefault();

    switch (event.key) {
      case "b":
        changeMark(editor, "bold");
        break;
      case "i":
        changeMark(editor, "italic");
        break;
      case "u":
        changeMark(editor, "underline");
        break;
      default:
        break;
    }
  };

  const handleMarkButtonClick = (mark) => (event) => {
    event.preventDefault();
    changeMark(editor, mark);
  };

  const handleBlockButtonClick = (type) => (event) => {
    event.preventDefault();
    toggleBlock(editor, type);
  };

  return (
    <div style={{ backgroundColor: "#171718", color: "#fff", textAlign: "start", padding: "10px" }}>
      <div style={{ display: `flex`, backgroundColor: "#171718" }}>
        <IconButton style={{ color: "grey" }} onPointerDown={handleMarkButtonClick("bold")}>
          <FormatBold />
        </IconButton>
        <IconButton style={{ color: "grey" }} onPointerDown={handleMarkButtonClick("italic")}>
          <FormatItalic />
        </IconButton>
        <IconButton style={{ color: "grey" }} onPointerDown={handleMarkButtonClick("underline")}>
          <FormatUnderlined />
        </IconButton>
        <IconButton style={{ color: "grey" }} onPointerDown={handleBlockButtonClick("code")}>
          <Code />
        </IconButton>
        <IconButton style={{ color: "grey" }} onPointerDown={handleBlockButtonClick("quote")}>
          <FormatQuote />
        </IconButton>
      </div>
      <Editable onKeyDown={onKeyDown} renderLeaf={renderLeaf} renderElement={renderElement} />
    </div>
  );
}

export default TextEditor;
