import { useState, useRef } from "react";
import MonacoEditor from "@monaco-editor/react";
import "./CodeEditor.css";

export default function CodeEditor() {
  const [code, setCode] = useState("// Start coding here\nconsole.log('Hello, World!');");
  const [output, setOutput] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState("javascript");
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const iframeRef = useRef(null);

  const languages = [
    { id: "javascript", name: "JavaScript", defaultCode: "// Start coding here\nconsole.log('Hello, World!');" },
    { id: "python", name: "Python", defaultCode: "# Start coding here\nprint('Hello, World!')" },
    { id: "java", name: "Java", defaultCode: "// Start coding here\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}" },
    { id: "cpp", name: "C++", defaultCode: "// Start coding here\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello, World!\" << endl;\n    return 0;\n}" },
    { id: "c", name: "C", defaultCode: "// Start coding here\n#include <stdio.h>\n\nint main() {\n    printf(\"Hello, World!\\n\");\n    return 0;\n}" },
    { id: "csharp", name: "C#", defaultCode: "// Start coding here\nusing System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine(\"Hello, World!\");\n    }\n}" },
    { id: "sql", name: "SQL", defaultCode: "-- Start coding here\nSELECT 'Hello, World!' AS message;" },
    { id: "html", name: "HTML", defaultCode: "<!-- Start coding here -->\n<!DOCTYPE html>\n<html>\n<head>\n    <title>Hello World</title>\n</head>\n<body>\n    <h1>Hello, World!</h1>\n</body>\n</html>" },
    { id: "css", name: "CSS", defaultCode: "/* Start coding here */\nbody {\n    font-family: Arial, sans-serif;\n    background-color: #f0f0f0;\n}\n\nh1 {\n    color: #333;\n    text-align: center;\n}" }
  ];

  const switchLanguage = (languageId) => {
    const language = languages.find(lang => lang.id === languageId);
    if (language) {
      setCurrentLanguage(languageId);
      setCode(language.defaultCode);
      setShowLanguageMenu(false);
      clearOutput();
    }
  };

  const runCode = () => {
    // Clear previous output
    setOutput("");

    // Handle different languages
    if (currentLanguage === "javascript") {
      runJavaScript();
    } else if (currentLanguage === "html") {
      runHTML();
    } else if (currentLanguage === "css") {
      runCSS();
    } else if (currentLanguage === "sql") {
      runSQL();
    } else {
      // For compiled languages (Python, Java, C++, C, C#)
      runCompiledLanguage();
    }
  };

  const runJavaScript = () => {
    const iframe = iframeRef.current;

    try {
      iframe.src = 'about:blank';

      setTimeout(() => {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

        if (!iframeDoc) {
          setOutput("Error: Cannot access iframe document");
          return;
        }

        const htmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body {
                  font-family: 'Courier New', monospace;
                  background: #1e1e1e;
                  color: #d4d4d4;
                  margin: 10px;
                  padding: 0;
                  font-size: 14px;
                }
                .output-container {
                  white-space: pre-wrap;
                  line-height: 1.4;
                }
                .error { color: #f48771; }
                .warn { color: #dcdcaa; }
                .log { color: #d4d4d4; }
              </style>
            </head>
            <body>
              <div class="output-container" id="outputContainer"></div>
              <script>
                (function() {
                  const outputContainer = document.getElementById('outputContainer');

                  window.console = {
                    log: function(...args) {
                      const message = args.map(arg => {
                        if (typeof arg === 'object' && arg !== null) {
                          try {
                            return JSON.stringify(arg, null, 2);
                          } catch (e) {
                            return String(arg);
                          }
                        }
                        return String(arg);
                      }).join(' ');

                      const logDiv = document.createElement('div');
                      logDiv.className = 'log';
                      logDiv.textContent = message;
                      outputContainer.appendChild(logDiv);
                    },

                    error: function(...args) {
                      const message = 'ERROR: ' + args.join(' ');
                      const errorDiv = document.createElement('div');
                      errorDiv.className = 'error';
                      errorDiv.textContent = message;
                      outputContainer.appendChild(errorDiv);
                    },

                    warn: function(...args) {
                      const message = 'WARNING: ' + args.join(' ');
                      const warnDiv = document.createElement('div');
                      warnDiv.className = 'warn';
                      warnDiv.textContent = message;
                      outputContainer.appendChild(warnDiv);
                    }
                  };

                  window.onerror = function(message, source, lineno, colno, error) {
                    const errorMsg = 'Runtime Error: ' + message + (lineno ? ' (Line: ' + lineno + ')' : '');
                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'error';
                    errorDiv.textContent = errorMsg;
                    outputContainer.appendChild(errorDiv);
                    return true;
                  };

                  window.addEventListener('unhandledrejection', function(event) {
                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'error';
                    errorDiv.textContent = 'Unhandled Promise Rejection: ' + event.reason;
                    outputContainer.appendChild(errorDiv);
                  });

                  try {
                    ${code}
                  } catch (error) {
                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'error';
                    errorDiv.textContent = 'Execution Error: ' + error.message;
                    outputContainer.appendChild(errorDiv);
                  }
                })();
              </script>
            </body>
          </html>
        `;

        iframeDoc.open();
        iframeDoc.write(htmlContent);
        iframeDoc.close();

      }, 10);

    } catch (error) {
      setOutput(`Error executing code: ${error.message}`);
    }
  };

  const runHTML = () => {
    const iframe = iframeRef.current;

    try {
      iframe.src = 'about:blank';

      setTimeout(() => {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

        if (!iframeDoc) {
          setOutput("Error: Cannot access iframe document");
          return;
        }

        iframeDoc.open();
        iframeDoc.write(code);
        iframeDoc.close();

      }, 10);

    } catch (error) {
      setOutput(`Error executing HTML: ${error.message}`);
    }
  };

  const runCSS = () => {
    const iframe = iframeRef.current;

    try {
      iframe.src = 'about:blank';

      setTimeout(() => {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

        if (!iframeDoc) {
          setOutput("Error: Cannot access iframe document");
          return;
        }

        const htmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  margin: 20px;
                  background: #f5f5f5;
                }
                ${code}
              </style>
            </head>
            <body>
              <h1>CSS Preview</h1>
              <p>This is a paragraph to demonstrate your CSS styles.</p>
              <div class="demo-box" style="padding: 20px; margin: 10px 0; border: 1px solid #ccc;">Demo Box</div>
              <button class="demo-button" style="padding: 10px 20px; margin: 5px;">Demo Button</button>
              <ul>
                <li>List item 1</li>
                <li>List item 2</li>
                <li>List item 3</li>
              </ul>
            </body>
          </html>
        `;

        iframeDoc.open();
        iframeDoc.write(htmlContent);
        iframeDoc.close();

      }, 10);

    } catch (error) {
      setOutput(`Error executing CSS: ${error.message}`);
    }
  };

  const runSQL = () => {
    const iframe = iframeRef.current;

    try {
      iframe.src = 'about:blank';

      setTimeout(() => {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

        if (!iframeDoc) {
          setOutput("Error: Cannot access iframe document");
          return;
        }

        const htmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body {
                  font-family: 'Courier New', monospace;
                  background: #1e1e1e;
                  color: #d4d4d4;
                  margin: 10px;
                  padding: 0;
                  font-size: 14px;
                }
                .sql-output {
                  white-space: pre-wrap;
                  line-height: 1.4;
                  color: #98c379;
                }
                .sql-info {
                  color: #61dafb;
                  margin-bottom: 10px;
                }
              </style>
            </head>
            <body>
              <div class="sql-info">📊 SQL Query Preview:</div>
              <div class="sql-output">${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}

💡 Note: SQL execution requires a database server.
This is a syntax preview only.</div>
            </body>
          </html>
        `;

        iframeDoc.open();
        iframeDoc.write(htmlContent);
        iframeDoc.close();

      }, 10);

    } catch (error) {
      setOutput(`Error displaying SQL: ${error.message}`);
    }
  };

  const runCompiledLanguage = () => {
    const iframe = iframeRef.current;
    const languageName = languages.find(l => l.id === currentLanguage)?.name || currentLanguage;

    try {
      iframe.src = 'about:blank';

      setTimeout(() => {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

        if (!iframeDoc) {
          setOutput("Error: Cannot access iframe document");
          return;
        }

        const htmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body {
                  font-family: 'Courier New', monospace;
                  background: #1e1e1e;
                  color: #d4d4d4;
                  margin: 10px;
                  padding: 0;
                  font-size: 14px;
                }
                .code-preview {
                  white-space: pre-wrap;
                  line-height: 1.4;
                  background: #2d2d2d;
                  padding: 15px;
                  border-radius: 5px;
                  border-left: 4px solid #667eea;
                }
                .info {
                  color: #61dafb;
                  margin-bottom: 15px;
                }
                .note {
                  color: #dcdcaa;
                  margin-top: 15px;
                  font-style: italic;
                }
              </style>
            </head>
            <body>
              <div class="info">🔧 ${languageName} Code Preview:</div>
              <div class="code-preview">${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
              <div class="note">💡 Note: ${languageName} execution requires a compiler/interpreter server.
This is a code preview with syntax highlighting.</div>
            </body>
          </html>
        `;

        iframeDoc.open();
        iframeDoc.write(htmlContent);
        iframeDoc.close();

      }, 10);

    } catch (error) {
      setOutput(`Error displaying ${languageName}: ${error.message}`);
    }
  };

  const clearOutput = () => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.src = 'about:blank';
      setTimeout(() => {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (iframeDoc) {
          iframeDoc.open();
          iframeDoc.write(`
            <!DOCTYPE html>
            <html>
              <head>
                <style>
                  body {
                    font-family: 'Courier New', monospace;
                    background: #1e1e1e;
                    color: #d4d4d4;
                    margin: 10px;
                    padding: 0;
                  }
                </style>
              </head>
              <body></body>
            </html>
          `);
          iframeDoc.close();
        }
      }, 10);
    }
    setOutput("");
  };

  return (
    <div className="ide-container">
      <div className="rotating-border-wrapper">
        <div className="rotating-border" />

        <div className="editor-box">
            {/* Uncomment this if you want to show the current language */}
          {/* <div className="language-indicator">
            Current Language: <span style={{color: '#667eea', fontWeight: 'bold'}}>{languages.find(l => l.id === currentLanguage)?.name}</span>
          </div> */}
          <MonacoEditor
            height="69cap"
            width="69cap"
            defaultLanguage={
            currentLanguage === "csharp" ? "csharp" : currentLanguage
            }
            language={currentLanguage === "csharp" ? "csharp" : currentLanguage}
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
        <div className="run-buttons">
          <button className="run-button" onClick={runCode}>Run</button>
          <button className="run-button" onClick={clearOutput}>Clear</button>
          <button className="run-button" onClick={runCode}>Save</button>
          <button
            className="run-button"
            onClick={() => setShowLanguageMenu(!showLanguageMenu)}
          >
            Languages
          </button>
          <button className="run-button" onClick={runCode}>Help</button>
          <button className="run-button" onClick={runCode}>Submit</button>
        </div>

        {showLanguageMenu && (
          <div className="language-menu">
            <h3>Select Language:</h3>
            <div className="language-grid">
              {languages.map((language) => (
                <button
                  key={language.id}
                  className={`language-option ${currentLanguage === language.id ? 'active' : ''}`}
                  onClick={() => switchLanguage(language.id)}
                >
                  {language.name}
                </button>
              ))}
            </div>
            <button
              className="close-menu"
              onClick={() => setShowLanguageMenu(false)}
            >
              Close
            </button>
          </div>
        )}

        <div>
          <h2 className="output-title">Output</h2>
          <iframe
            ref={iframeRef}
            title="output"
            sandbox="allow-scripts allow-same-origin"
            className="output-iframe"
          ></iframe>
          {output && (
            <div style={{ color: '#f48771', padding: '10px', fontFamily: 'monospace' }}>
              {output}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
