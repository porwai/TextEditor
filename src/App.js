import React, { useState } from "react";
import { createEditor } from "slate";
import { Slate, withReact } from "slate-react";
import TextEditor from "./Components/TextEditor";

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
      <Slate editor={editor} initialValue={value}>
        <TextEditor editor={editor} />
      </Slate>
    </div>
  );
}
