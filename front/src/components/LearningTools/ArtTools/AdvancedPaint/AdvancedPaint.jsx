import { useRef, useState, useEffect } from "react";
import './AdvancedPaint.css'; // import the CSS separately

export default function AdvancedPaint() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState("brush");
  const [history, setHistory] = useState([]);
  const [historyStep, setHistoryStep] = useState(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 800;
    canvas.height = 600;

    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctxRef.current = ctx;

    saveHistory(ctx);
  }, []);

  useEffect(() => {
    if (!ctxRef.current) return;
    ctxRef.current.strokeStyle = tool === "eraser" ? "#FFFFFF" : brushColor;
    ctxRef.current.lineWidth = brushSize;
  }, [brushColor, brushSize, tool]);

  const saveHistory = (ctx) => {
    const canvas = ctx.canvas;
    const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let newHistory;
    if (historyStep < history.length - 1) {
      newHistory = history.slice(0, historyStep + 1);
    } else {
      newHistory = [...history];
    }
    newHistory.push(snapshot);
    setHistory(newHistory);
    setHistoryStep(newHistory.length - 1);
  };

  const undo = () => {
    if (historyStep <= 0) return;
    const newStep = historyStep - 1;
    const ctx = ctxRef.current;
    ctx.putImageData(history[newStep], 0, 0);
    setHistoryStep(newStep);
  };

  const redo = () => {
    if (historyStep >= history.length - 1) return;
    const newStep = historyStep + 1;
    const ctx = ctxRef.current;
    ctx.putImageData(history[newStep], 0, 0);
    setHistoryStep(newStep);
  };

  const startDrawing = (e) => {
    e.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX ?? e.touches[0].clientX;
    const y = e.clientY ?? e.touches[0].clientY;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x - rect.left, y - rect.top);
    setIsDrawing(true);
  };

  const draw = (e) => {
    e.preventDefault();
    if (!isDrawing) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX ?? e.touches[0].clientX;
    const y = e.clientY ?? e.touches[0].clientY;
    ctxRef.current.lineTo(x - rect.left, y - rect.top);
    ctxRef.current.stroke();
  };

  const stopDrawing = (e) => {
    e.preventDefault();
    if (!isDrawing) return;
    ctxRef.current.closePath();
    setIsDrawing(false);
    saveHistory(ctxRef.current);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    saveHistory(ctx);
  };

  const saveImage = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "my_drawing.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="paint-container">
      <div className="controls">
        <label>
          Brush Size:{" "}
          <input
            type="range"
            min="1"
            max="50"
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value, 10))}
          />
          <span>{brushSize}</span>
        </label>
        <label>
          Brush Color:{" "}
          <input
            type="color"
            value={brushColor}
            onChange={(e) => setBrushColor(e.target.value)}
            disabled={tool === "eraser"}
          />
        </label>


        <label>
          <input
            type="radio"
            name="tool"
            value="brush"
            checked={tool === "brush"}
            onChange={() => setTool("brush")}
          />{" "}
          Brush
        </label>

        <label>
          <input
            type="radio"
            name="tool"
            value="eraser"
            checked={tool === "eraser"}
            onChange={() => setTool("eraser")}
          />{" "}
          Eraser
        </label>

        <button
          className="advanced-paint-button"
        onClick={undo} disabled={historyStep <= 0}>
          Undo
        </button>
        <button
          className="advanced-paint-button"
        onClick={redo} disabled={historyStep >= history.length - 1}>
          Redo
        </button>
        <button
          className="advanced-paint-button"
        onClick={clearCanvas}>Clear</button>
        <button
          className="advanced-paint-button"
        onClick={saveImage}>Save</button>
        <button
          className="advanced-paint-button"
        >Submit</button>
      </div>

      <canvas
        ref={canvasRef}
        className="paint-canvas"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
    </div>
  );
}
