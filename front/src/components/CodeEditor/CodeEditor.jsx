import { useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import "./CodeEditor.css"; // Ensure you have the appropriate styles for the editor
export default function CodeEditor() {
  const [code, setCode] = useState("// Start coding here\n");

  return (
    <div className="ide-container">
      <div className="rotating-border-wrapper">
        <div className="rotating-border" />

        <div className="editor-box">
          <MonacoEditor
            height="50cap"
            width="80cap"
            defaultLanguage="javascript"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value)}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              wordWrap: "on",
            }}
          />
        </div>
      </div>
    </div>
  );
}
