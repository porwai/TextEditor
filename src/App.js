import React, { useState } from "react";
import { createEditor } from "slate";
import { Slate, withReact } from "slate-react";
import TextEditor from "./Components/TextEditor";
import './styles.css';
import Sidebar from "./SideBar/Sidebar";

const files = ['File1', 'File2', 'File3']; // Replace with your actual file names

export default function App() {

  const [editor] = useState(() => withReact(createEditor()));
  const value = [
    {
      type: "paragraph",
      children: [{ text: "Text Editor" }]
    }
  ];
  return (
    <div className="App">
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-grow bg-gray-100 p-6">
          <div className="editor">
            <Slate editor={editor} initialValue={value}>
              <TextEditor editor={editor} />
            </Slate>
          </div>
        </div>
      </div>
    </div>
  );
}
