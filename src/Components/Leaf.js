const Leaf = ({ attributes, children, leaf }) => {
  let style = {};
  if (leaf.bold) {
    style.fontWeight = 'bold';
  }
  if (leaf.italic) {
    style.fontStyle = 'italic';
  }
  if (leaf.underline) {
    style.textDecoration = 'underline';
  }
  
  return (
    <span {...attributes} style={style}>
      {children}
    </span>
  );
};
  
export default Leaf;  