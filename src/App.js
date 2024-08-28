import React, { useState } from "react";
import { createEditor } from "slate";
import { Slate, withReact } from "slate-react";
import TextEditor from "./Components/TextEditor";
import './styles.css';

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
      <div className="sidebar">
        <ul>
          {files.map((file, index) => (
            <li key={index}>{file}</li>
          ))}
        </ul>
      </div>
      <div className="editor">
        <Slate editor={editor} initialValue={value}>
          <TextEditor editor={editor} />
        </Slate>
      </div>
    </div>
  );
}
