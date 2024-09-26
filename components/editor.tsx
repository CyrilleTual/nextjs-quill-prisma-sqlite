// components/editor.tsx

"use client";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
}

const Editor: React.FC<EditorProps> = ({ content, onChange }) => {
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["link", "formula"],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["clean"],
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  return (
    <ReactQuill
      className="p-4 m-4 border border-blue-300 rounded-lg shadow-sm min-h-[200px]"
      theme="snow"
      modules={modules}
      value={content}
      onChange={onChange}
      placeholder="ici votre texte"
    />
  );
};

export default Editor;
