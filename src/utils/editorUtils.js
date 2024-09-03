import { Editor, Transforms, Node } from "slate";

export const toggleMark = (editor, mark) => {
  const isActive = isMarkActive(editor, mark);
  if (isActive) {
    Editor.removeMark(editor, mark);
  } else {
    Editor.addMark(editor, mark, true);
  }
};

export const isMarkActive = (editor, mark) => {
  const marks = Editor.marks(editor);
  return marks ? marks[mark] === true : false;
};

export const toggleBlock = (editor, type) => {
  const isActive = isBlockActive(editor, type);
  const isList = type === "bulleted-list" || type === "numbered-list";

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && Editor.isBlock(editor, n) && n.type === "list-item",
    split: true,
  });

  const newType = isActive ? "paragraph" : isList ? "list-item" : type;

  Transforms.setNodes(editor, {
    type: newType,
  });

  if (!isActive && isList) {
    const block = { type, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export const isBlockActive = (editor, type) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === type,
  });
  return !!match;
};

export const getEditorTextContent = (editor) => {
    return editor.children.map(n => Node.string(n)).join('\n');
};