import React, { useCallback, useState, useRef } from "react";
import { Transforms, Range } from "slate";
import { Editable } from "slate-react";

import Leaf from "./Leaf";
import { BlockQuote, CodeElement, DefaultElement } from "./Elements";
import { changeMark, toggleBlock, getEditorTextContent } from "../utils/editorUtils";
import { askLLM } from "../utils/llmUtils";
import DropdownMenu from "./DropdownMenu";
import EditorToolbar from "./EditorToolbar";

function TextEditor({ editor }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [llmResponse, setLlmResponse] = useState(null); // State to store the LLM response
  const editorRef = useRef();

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
    if (event.key === "/") {
      const domRange = window.getSelection().getRangeAt(0);
      const rect = domRange.getBoundingClientRect();
      setDropdownPosition({ top: rect.top + window.scrollY + 20, left: rect.left + window.scrollX });
      setShowDropdown(true);
    } else if (showDropdown && event.key !== " ") {
      setShowDropdown(false);
    }

    if (event.ctrlKey) {
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
    }
  };

  const handleDropdownClick = (blockType) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      Transforms.delete(editor, {
        at: { anchor: { ...selection.anchor, offset: selection.anchor.offset - 1 }, focus: selection.anchor },
      });

      toggleBlock(editor, blockType);
    }

    setShowDropdown(false);
  };

  const handleAskLLMClick = async () => {
    const context = getEditorTextContent(editor);
    const userPrompt = prompt("What do you want to ask the LLM?");
    if (userPrompt) {
      const response = await askLLM(context, userPrompt);
      setLlmResponse(response);
    }
    setShowDropdown(false);
  };


  return (
    <div style={{ backgroundColor: "#171718", color: "#fff", textAlign: "start", padding: "10px" }}>
      <EditorToolbar
        onBold={() => changeMark(editor, "bold")}
        onItalic={() => changeMark(editor, "italic")}
        onUnderline={() => changeMark(editor, "underline")}
        onCode={() => toggleBlock(editor, "code")}
        onQuote={() => toggleBlock(editor, "quote")}
      />
      <Editable
        ref={editorRef}
        onKeyDown={onKeyDown}
        renderLeaf={renderLeaf}
        renderElement={renderElement}
      />
      {showDropdown && <DropdownMenu position={dropdownPosition} onSelect={handleDropdownClick} onAskLLM={handleAskLLMClick} />}
      
      {llmResponse && (
        <div style={{ marginTop: "20px", padding: "10px", backgroundColor: "#222", color: "#fff" }}>
          <h4>LLM Response:</h4>
          <p>{llmResponse}</p>
        </div>
      )}
    </div>
  );
}

export default TextEditor;
