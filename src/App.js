import React, { useState, useMemo } from "react";
import { createEditor } from "slate";
import { Slate, withReact } from "slate-react";
import { withHistory } from 'slate-history'
import TextEditor from "./Components/TextEditor";
import './styles.css';
import Sidebar from "./SideBar/Sidebar";

export default function App() {

  const editor = useMemo(() => withHistory(withReact(createEditor())), [])
  const value = [
    {
      type: "paragraph",
      children: [{ text: "Text Editor" }]
    }
  ];
  return (
    <div className="App">
      <Sidebar />
      <div className="editor">
        <Slate editor={editor} initialValue={value}>
          <TextEditor editor={editor} />
        </Slate>
      </div>
    </div>
  );
}
