import { useCallback } from "react";
import { Editor, Transforms, Text } from "slate";
import { Editable } from "slate-react";
import { IconButton } from "@mui/material";
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  Code,
  FormatQuote
} from "@mui/icons-material";

const BlockQuote = (props) => {
  return <blockquote {...props.attributes}>{props.children}</blockquote>;
}

const CodeElement = (props) => {
  return <code {...props.attributes}>{props.children}</code>;
};

const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};

const Leaf = (props) => {
  return (
    <span
      {...props.attributes}
      style={{
        fontWeight: props.leaf.bold ? "bold" : "normal",
        fontStyle: props.leaf.italic ? "italic" : "normal",
        textDecoration: props.leaf.underline ? "underline" : "none"
      }}
    >
      {props.children}
    </span>
  );
};

function TextEditor({ editor }) {
  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      case 'quote':
        return <BlockQuote {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  function changeMark(mark) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n[mark]
    });

    Transforms.setNodes(
      editor,
      { [mark]: !match },
      { match: (n) => Text.isText(n), split: true }
    );
  }

  function changeType(type) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === type
    });
    Transforms.setNodes(
      editor,
      { type: match ? null : type },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  }

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  const onKeyDown = (event) => {
    if (!event.ctrlKey) {
      return;
    }

    event.preventDefault();

    switch (event.key) {
      case "b": {
        changeMark("bold");
        break;
      }

      case "i": {
        changeMark("italic");
        break;
      }

      case "u": {
        changeMark("underline");
        break;
      }
      default: {
        break;
      }
    }
  };
  return (
    <div
      style={{
        backgroundColor: "#171718",
        color: "#fff",
        textAlign: "start",
        padding: "10px"
      }}
    >
      <div style={{ display: `flex`, backgroundColor: "#171718" }}>
        <IconButton
          style={{ color: "grey" }}
          onPointerDown={(e) => {
            changeMark("bold");
          }}
        >
          <FormatBold />
        </IconButton>
        <IconButton
          style={{ color: "grey" }}
          onPointerDown={(e) => {
            changeMark("italic");
          }}
        >
          <FormatItalic />
        </IconButton>
        <IconButton
          style={{ color: "grey" }}
          onPointerDown={(e) => {
            changeMark("underline");
          }}
        >
          <FormatUnderlined />
        </IconButton>
        <IconButton
          onPointerDown={(e) => {
            changeType("code");
          }}
          style={{ color: "grey" }}
        >
          <Code />
        </IconButton>
        <IconButton
          onPointerDown={(e) => {
            changeType("quote");
          }}
          style={{ color: "grey" }}
        >
          <FormatQuote />
        </IconButton>
      </div>
      <Editable
        onKeyDown={onKeyDown}
        renderLeaf={renderLeaf}
        renderElement={renderElement}
      />
    </div>
  );
}

export default TextEditor;