import { Editor, Transforms } from "slate";

export const changeMark = (editor, mark) => {
  const isActive = isMarkActive(editor, mark);
  if (isActive) {
    Editor.removeMark(editor, mark);
  } else {
    Editor.addMark(editor, mark, true);
  }
};

export const isMarkActive = (editor, mark) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n[mark] === true,
    universal: true,
  });
  return !!match;
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
