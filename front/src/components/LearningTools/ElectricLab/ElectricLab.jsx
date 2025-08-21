import { useState } from "react";
import "./ElectricLab.css";
import COMPONENTS from "./ComponentsData";

function ElectricLab() {
  const [placedComponents, setPlacedComponents] = useState([]);
  const [draggingComp, setDraggingComp] = useState(null);
  const [wireStart, setWireStart] = useState(null);
  const [wires, setWires] = useState([]);

  // Reset function
  const handleReset = () => {
    setPlacedComponents([]);
    setWires([]);
    setWireStart(null);
  };

  // Drag from panel
  const handleDragStart = (e, component) => {
    e.dataTransfer.setData("component", JSON.stringify(component));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const component = JSON.parse(e.dataTransfer.getData("component"));
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round((e.clientX - rect.left) / 50) * 50;
    const y = Math.round((e.clientY - rect.top) / 50) * 50;
    setPlacedComponents([...placedComponents, { ...component, x, y, id: Date.now() }]);
  };

  const handleDragOver = (e) => e.preventDefault();

  // Move placed components
  const handleMouseDown = (e, comp) => {
    e.preventDefault();
    if (comp.type === "wire") return;
    setDraggingComp(comp.id);
  };

  const handleMouseMove = (e) => {
    if (!draggingComp) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round((e.clientX - rect.left) / 50) * 50;
    const y = Math.round((e.clientY - rect.top) / 50) * 50;
    setPlacedComponents((prev) =>
      prev.map((c) => (c.id === draggingComp ? { ...c, x, y } : c))
    );
  };

  const handleMouseUp = () => setDraggingComp(null);

  // Wire creation
  const handleWireClick = (comp) => {
    if (!wireStart) {
      setWireStart(comp);
    } else if (wireStart.id !== comp.id) {
      setWires([...wires, { from: wireStart, to: comp, id: Date.now() }]);
      setWireStart(null);
    }
  };

  // Light logic
  const isLightOn = (light) => {
    const battery = placedComponents.find((c) => c.type === "battery");
    const sw = placedComponents.find((c) => c.type === "switch");
    if (!battery || !sw) return false;
    const distBatterySwitch = Math.hypot(sw.x - battery.x, sw.y - battery.y);
    const distSwitchLight = Math.hypot(light.x - sw.x, light.y - sw.y);
    return (distBatterySwitch < 200 && distSwitchLight < 200) || isMagnetNearLight(light);
  };

  const isMagnetNearLight = (light) => {
    const magnet = placedComponents.find((c) => c.type === "magnet");
    if (!magnet) return false;
    const dist = Math.hypot(light.x - magnet.x, light.y - magnet.y);
    return dist < 150;
  };

  // SVG render
  const renderSVG = (type, on = false) => {
    switch (type) {
      case "battery":
        return (
          <svg width="40" height="40">
            <rect x="10" y="5" width="5" height="30" fill="#ff5722" />
            <rect x="25" y="5" width="5" height="30" fill="#ff5722" />
          </svg>
        );
      case "resistor":
        return (
          <svg width="50" height="20">
            <rect x="0" y="8" width="50" height="4" fill="#f44336" />
          </svg>
        );
      case "capacitor":
        return (
          <svg width="50" height="20">
            <line x1="15" y1="0" x2="15" y2="20" stroke="#2196f3" strokeWidth="4"/>
            <line x1="35" y1="0" x2="35" y2="20" stroke="#2196f3" strokeWidth="4"/>
          </svg>
        );
      case "switch":
        return (
          <svg width="50" height="20">
            <line x1="0" y1="10" x2="30" y2="10" stroke="#fff" strokeWidth="3" />
            <line x1="30" y1="10" x2="45" y2="0" stroke="#fff" strokeWidth="3" />
          </svg>
        );
      case "lightbulb":
        return (
          <svg width="30" height="40">
            <circle
              cx="15"
              cy="15"
              r="10"
              fill={on ? "#ffeb3b" : "#777"}
              stroke="#999"
              strokeWidth="2"
            />
            <rect x="12" y="25" width="6" height="10" fill="#777" />
          </svg>
        );
      case "wire":
        return (
          <svg width="50" height="10">
            <line x1="0" y1="5" x2="50" y2="5" stroke="#ffc107" strokeWidth="3" />
          </svg>
        );
      case "magnet":
        return (
          <svg width="40" height="40">
            <circle cx="20" cy="20" r="15" fill="#e91e63" stroke="#fff" strokeWidth="2"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="electric-lab-container">
      <div className="component-panel">
        <h3>Components</h3>
        {COMPONENTS.map((comp) => (
          <div
            key={comp.id}
            className="component-item"
            draggable
            onDragStart={(e) => handleDragStart(e, comp)}
          >
            {renderSVG(comp.type)} <span className="component-label">{comp.label}</span>
          </div>
        ))}
        <p style={{color:"#eee",marginTop:"10px",fontSize:"12px"}}>Click two components to create a wire</p>
        <button className="reset-button" onClick={handleReset}>Reset Lab</button>
      </div>

      <div
        className="lab-canvas"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Wires */}
        {wires.map((wire) => {
          const x1 = wire.from.x + 25;
          const y1 = wire.from.y + 25;
          const x2 = wire.to.x + 25;
          const y2 = wire.to.y + 25;
          const lightOn = (wire.from.type === "battery" && wire.to.type === "lightbulb") ||
                          (wire.to.type === "battery" && wire.from.type === "lightbulb");
          return (
            <svg
              key={wire.id}
              className={`wire-line ${lightOn ? "active" : ""}`}
              style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none", overflow:"visible"}}
            >
              <line
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={lightOn ? "#ffeb3b" : "#ffc107"}
                strokeWidth="3"
              />
            </svg>
          );
        })}

        {/* Components */}
        {placedComponents.map((comp) => {
          const lightOn = comp.type === "lightbulb" && isLightOn(comp);
          return (
            <div
              key={comp.id}
              className={`placed-component ${comp.type} ${lightOn ? "on" : ""}`}
              style={{ top: comp.y, left: comp.x }}
              onMouseDown={(e) => {
                handleMouseDown(e, comp);
                if(comp.type!=="wire") handleWireClick(comp);
              }}
            >
              {renderSVG(comp.type, lightOn)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ElectricLab;
