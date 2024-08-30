import React from "react";

const DropdownMenu = ({ position, onSelect, onAskLLM }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        backgroundColor: "#333",
        color: "#fff",
        borderRadius: "4px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
      }}
    >
      <div style={{ padding: "8px", cursor: "pointer" }} onClick={() => onSelect("paragraph")}>
        Text
      </div>
      <div style={{ padding: "8px", cursor: "pointer" }} onClick={() => onSelect("quote")}>
        Quote
      </div>
      <div style={{ padding: "8px", cursor: "pointer" }} onClick={() => onSelect("code")}>
        Code
      </div>
      <div style={{ padding: "8px", cursor: "pointer" }} onClick={() => onSelect("heading-one")}>
        Heading 1
      </div>
      <div style={{ padding: "8px", cursor: "pointer" }} onClick={() => onSelect("heading-two")}>
        Heading 2
      </div>
      <div style={{ padding: "8px", cursor: "pointer", color: "cyan" }} onClick={onAskLLM}>
        Ask LLM
      </div>
    </div>
  );
};

export default DropdownMenu;
