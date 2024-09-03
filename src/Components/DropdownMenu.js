import React from "react";

const DropdownItem = ({ onClick, children, explanation, className = "" }) => (
  <button
    className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors duration-150 ease-in-out ${className}`}
    onClick={onClick}
  >
    <div className="font-medium">{children}</div>
    <div className="text-xs text-gray-500 mt-1">{explanation}</div>
  </button>
);

const DropdownMenu = ({ position, onSelect, onAskLLM }) => {
  const menuItems = [
    { label: "Text", action: () => onSelect("paragraph"), explanation: "Create a regular paragraph" },
    { label: "Quote", action: () => onSelect("quote"), explanation: "Insert a block quote" },
    { label: "Code", action: () => onSelect("code"), explanation: "Add a code block" },
    { label: "Heading 1", action: () => onSelect("heading-one"), explanation: "Insert a main heading" },
    { label: "Heading 2", action: () => onSelect("heading-two"), explanation: "Add a subheading" },
    { label: "Ask LLM", action: onAskLLM, explanation: "Get AI assistance", className: "text-blue-600" },
  ];

  return (
    <div
      className="absolute bg-white text-black rounded-md shadow-lg z-50 w-64 py-1 overflow-hidden border border-gray-200"
      style={{ top: position.top, left: position.left }}
    >
      {menuItems.map((item, index) => (
        <DropdownItem
          key={index}
          onClick={item.action}
          className={item.className}
          explanation={item.explanation}
        >
          {item.label}
        </DropdownItem>
      ))}
    </div>
  );
};

export default DropdownMenu;