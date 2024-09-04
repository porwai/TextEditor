import React, { useCallback, useState, useRef } from "react";
import isHotkey from 'is-hotkey'
import {
  Transforms,
  Range,
} from 'slate'
import { Editable } from "slate-react";

import Leaf from "./Leaf";
import Element from "./Elements";
import { toggleMark, toggleBlock, getEditorTextContent } from "../utils/editorUtils";
import { askLLM } from "../utils/llmUtils";
import DropdownMenu from "./DropdownMenu";
import EditorToolbar from "./EditorToolbar";

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

function TextEditor({ editor }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [llmResponse, setLlmResponse] = useState(null); // State to store the LLM response
  const editorRef = useRef();

  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback((props) => { return <Leaf {...props} />; }, []);

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
    <div className="bg-gray-900 text-black p-4 min-h-screen flex flex-col">
      <div className="max-w mx-auto w-full flex-grow flex flex-col">
        <EditorToolbar
          className="mb-4 p-2 bg-gray-800 rounded-md shadow-md"
        />

        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter some rich text…"
          spellCheck
          autoFocus
          className="flex-grow p-4 bg-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-auto"
          onKeyDown={event => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault()
                const mark = HOTKEYS[hotkey]
                toggleMark(editor, mark)
              }
            }
            if (event.key === "/") {
              const domRange = window.getSelection().getRangeAt(0);
              const rect = domRange.getBoundingClientRect();
              setDropdownPosition({ top: rect.top + window.scrollY + 20, left: rect.left + window.scrollX });
              setShowDropdown(true);
            } else if (showDropdown && event.key !== " ") {
              setShowDropdown(false);
            }        
          }}
        />
        
        {showDropdown && (
          <DropdownMenu 
            position={dropdownPosition} 
            onSelect={handleDropdownClick} 
            onAskLLM={handleAskLLMClick}
            className="mt-2 bg-gray-800 rounded-md shadow-lg"
          />
        )}
        {llmResponse && (
          <div className="mt-6 p-4 bg-gray-800 rounded-md shadow-md">
            <h4 className="text-lg font-semibold mb-2">LLM Response:</h4>
            <p className="text-gray-300">{llmResponse}</p>
          </div>
        )}
      </div>
    </div>
  );

  
}

export default TextEditor;
