import { useState, useRef } from "react";
import MonacoEditor from "@monaco-editor/react";
import "./CodeEditor.css";

export default function CodeEditor() {
  const [code, setCode] = useState("// Start coding here\nconsole.log('Hello, World!');");
  const iframeRef = useRef(null);

  const runCode = () => {
    const iframe = iframeRef.current;
    const document = iframe.contentDocument;
    const script = document.createElement("script");
    document.open();
    document.write("<pre id='output'></pre>");
    document.close();

    const output = document.getElementById("output");
    const originalLog = console.log;
    const logs = [];

    window.console.log = function (...args) {
      logs.push(args.join(" "));
      output.innerText = logs.join("\n");
    };

    script.type = "text/javascript";
    script.text = code;
    document.body.appendChild(script);
    window.console.log = originalLog;
  };

  return (
    <div className="ide-container">
      <div className="rotating-border-wrapper">
        <div className="rotating-border" />

        <div className="editor-box">
          <MonacoEditor
            height="69cap"
            width="69cap"
            defaultLanguage="javascript"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value)}
            options={{
              fontSize: 14,
              minimap: { enabled: true },
              scrollBeyondLastLine: false,
              wordWrap: "on",
            }}
          />
        </div>


      </div>

          <div className="output-box">

            <div
                className="run-buttons"
            >

          <button className="run-button" onClick={runCode}>Run</button>
          <button className="run-button" onClick={runCode}>Save</button>
          <button className="run-button" onClick={runCode}>Languages</button>
          <button className="run-button" onClick={runCode}>Help</button>
          <button className="run-button" onClick={runCode}>Submit</button>
            </div>

            <div>

            <h2 className="output-title">Output</h2>
            <iframe
              ref={iframeRef}
              title="output"
              sandbox="allow-scripts"
              className="output-iframe"
            ></iframe>
            </div>
          </div>
    </div>
  );
}
