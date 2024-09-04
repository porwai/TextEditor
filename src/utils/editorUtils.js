import { Editor, Transforms, Node, Element as SlateElement } from "slate";

export const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

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

export const isBlockActive = (editor, format, blockType = 'type') => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    })
  )

  return !!match
}

export const getEditorTextContent = (editor) => {
    return editor.children.map(n => Node.string(n)).join('\n');
};