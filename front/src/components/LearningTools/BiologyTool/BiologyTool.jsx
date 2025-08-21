// src/components/LearningTools/BiologyTool/BiologyTool.jsx
import React, { useEffect, useRef, useState } from "react";
import CELLS from "./cells";
import "./BiologyTool.css";

/**
 * Mitosis stages and simple behavior:
 * 0 - Interphase (prep) : chromosomes not condensed
 * 1 - Prophase : chromosomes condense, spindle starts
 * 2 - Metaphase : chromosomes align at midline
 * 3 - Anaphase : chromatids separate and move toward poles
 * 4 - Telophase : nuclear envelopes reform
 * 5 - Cytokinesis : cell splits
 */

const STAGE_NAMES = ["Interphase", "Prophase", "Metaphase", "Anaphase", "Telophase", "Cytokinesis"];

function Hotspot({ part, onClick }) {
  // for membrane (large circle) show outline differently
  if (part.radius) {
    return (
      <circle
        className="hotspot membrane-hotspot"
        cx={part.x}
        cy={part.y}
        r={part.radius}
        onClick={(e) => { e.stopPropagation(); onClick(part); }}
      />
    );
  }

  return (
    <g className="hotspot-group" transform={`translate(${part.x}, ${part.y})`} onClick={(e) => { e.stopPropagation(); onClick(part); }}>
      <circle className="hotspot-dot" cx="0" cy="0" r="10" />
      <text className="hotspot-label" x="14" y="6">{part.name}</text>
    </g>
  );
}

function Chromosome({ x, y, angle = 0, id }) {
  // a chromosome is shown as two sister chromatids (two circles joined by a short bar)
  const armLen = 12;
  const rad = 6;
  const x1 = x - armLen * Math.cos(angle);
  const y1 = y - armLen * Math.sin(angle);
  const x2 = x + armLen * Math.cos(angle);
  const y2 = y + armLen * Math.sin(angle);

  return (
    <g key={id} className="chromosome">
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3b3bff" strokeWidth="4" strokeLinecap="round" />
      <circle cx={x1} cy={y1} r={rad} fill="#6a6aff" />
      <circle cx={x2} cy={y2} r={rad} fill="#6a6aff" />
    </g>
  );
}

export default function BiologyTool() {
  const [selectedCellKey, setSelectedCellKey] = useState("animal");
  const [selectedPart, setSelectedPart] = useState(null);

  // mitosis state
  const [stageIndex, setStageIndex] = useState(0); // 0..5
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(1); // multiplier: 0.5..3
  const animRef = useRef(null);

  // chromosomes positions (array of {x,y,angle})
  const [chromosomes, setChromosomes] = useState([]);
  const mountedRef = useRef(false);

  const cell = CELLS[selectedCellKey];

  // initialize chromosomes for the selected cell (centered in nucleus)
  useEffect(() => {
    // create N chromosome pairs
    const nucleus = cell.parts.find(p => p.id === "nucleus" || p.id === "nucleoid" || p.id === "capsid") || { x: 250, y: 250 };
    const centerX = nucleus.x;
    const centerY = nucleus.y;
    const N = 8; // number of chromosomes (visual)
    const arr = [];
    for (let i = 0; i < N; i++) {
      const angle = (i / N) * Math.PI * 2;
      const radius = 20 + (i % 3) * 10;
      arr.push({ id: `c${i}`, x: centerX + Math.cos(angle) * radius, y: centerY + Math.sin(angle) * radius, angle });
    }
    setChromosomes(arr);
    setStageIndex(0);
    setRunning(false);
    setSelectedPart(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCellKey]);

  // animation loop controls movement during stages
  useEffect(() => {
    mountedRef.current = true;
    let last = performance.now();

    function step(now) {
      const delta = (now - last) / 1000 * speed; // seconds scaled by speed
      last = now;

      setChromosomes(prev => {
        // We'll mutate a new array based on stage
        const nucleus = cell.parts.find(p => p.id === "nucleus" || p.id === "nucleoid") || { x: 250, y: 250 };
        const cx = nucleus.x, cy = nucleus.y;
        const next = prev.map((ch, idx) => {
          const copy = { ...ch };
          // behavior by stage:
          if (stageIndex === 0) {
            // interphase - gentle drift
            copy.x += Math.sin((now / 500) + idx) * 0.2 * delta * 10;
            copy.y += Math.cos((now / 700) + idx) * 0.2 * delta * 10;
            copy.angle += 0.05 * delta;
          } else if (stageIndex === 1) {
            // prophase - condense toward center
            copy.x += (cx - copy.x) * 0.6 * delta;
            copy.y += (cy - copy.y) * 0.6 * delta;
            copy.angle += 0.3 * delta;
          } else if (stageIndex === 2) {
            // metaphase - align on midline (vertical line through cx)
            const targetX = cx;
            copy.x += (targetX - copy.x) * 1.2 * delta;
            copy.y += (cy + ((idx - prev.length / 2) * 8)) - copy.y * 0.0;
            copy.angle = 0;
          } else if (stageIndex === 3) {
            // anaphase - split: half go left, half go right
            const dir = idx % 2 === 0 ? -1 : 1;
            copy.x += dir * (30 + idx % 4 * 10) * delta;
            copy.y += (idx - prev.length / 2) * 0.6 * delta;
            copy.angle += (dir * 0.2) * delta;
          } else if (stageIndex === 4) {
            // telophase - congregate near poles to form nuclei
            const dir = idx % 2 === 0 ? -1 : 1;
            const targetX = cx + dir * 70;
            const targetY = cy + (idx % 4 - 2) * 10;
            copy.x += (targetX - copy.x) * 0.7 * delta;
            copy.y += (targetY - copy.y) * 0.7 * delta;
            copy.angle += 0.05 * delta;
          } else if (stageIndex === 5) {
            // cytokinesis - chromosomes stay near pole, small oscillation
            copy.x += Math.sin(now / 200 + idx) * 0.2 * delta;
            copy.y += Math.cos(now / 300 + idx) * 0.2 * delta;
            copy.angle += 0.02 * delta;
          }
          return copy;
        });
        return next;
      });

      if (running) animRef.current = requestAnimationFrame(step);
    }

    if (running) {
      animRef.current = requestAnimationFrame(step);
    }

    return () => {
      mountedRef.current = false;
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, stageIndex, speed, cell]);

  // control: when hitting next stage programmatically
  function nextStage() {
    setStageIndex((s) => Math.min(s + 1, STAGE_NAMES.length - 1));
  }
  function prevStage() {
    setStageIndex((s) => Math.max(s - 1, 0));
  }
  function toggleRun() {
    setRunning(r => !r);
  }
  function resetAll() {
    // re-init chromosomes
    const nucleus = cell.parts.find(p => p.id === "nucleus" || p.id === "nucleoid") || { x: 250, y: 250 };
    const centerX = nucleus.x;
    const centerY = nucleus.y;
    const N = 8;
    const arr = [];
    for (let i = 0; i < N; i++) {
      const angle = (i / N) * Math.PI * 2;
      const radius = 20 + (i % 3) * 10;
      arr.push({ id: `c${i}`, x: centerX + Math.cos(angle) * radius, y: centerY + Math.sin(angle) * radius, angle });
    }
    setChromosomes(arr);
    setStageIndex(0);
    setRunning(false);
    setSelectedPart(null);
  }

  // click on background clears selected part
  function onSvgClick() {
    setSelectedPart(null);
  }

  // render different visual for cytokinesis depending on cell type
  function renderCytokinesisOverlay() {
    if (stageIndex !== 5) return null;
    if (selectedCellKey === "plant") {
      // cell plate (rectangle forming between poles)
      return <rect x="230" y="220" width="40" height="60" fill="#c2a97f" opacity="0.7" />;
    }
    // animal: cleavage furrow (ellipse narrowing)
    return <ellipse cx="250" cy="250" rx="90" ry="40" fill="rgba(0,0,0,0.15)" />;
  }

  return (
    <div className="biology-tool">
      <header className="bt-header">
        <h1>Biology Tool — Cells & Mitosis (2D)</h1>
      </header>

      <div className="bt-controls-row">
        <div className="cell-selector">
          {Object.keys(CELLS).map((k) => (
            <button
              key={k}
              className={`cell-btn ${selectedCellKey === k ? "active" : ""}`}
              onClick={() => setSelectedCellKey(k)}
            >
              {CELLS[k].name}
            </button>
          ))}
        </div>

        <div className="sim-controls">
          <div className="play-controls">
            <button onClick={prevStage} title="Previous stage">◀ Prev</button>
            <button onClick={() => { toggleRun(); }} title="Play / Pause">{running ? "⏸ Pause" : "▶ Play"}</button>
            <button onClick={nextStage} title="Next stage">Next ▶</button>
            <button onClick={resetAll} title="Reset">⟲ Reset</button>
          </div>

          <div className="speed-control">
            <label>Speed</label>
            <input
              type="range"
              min="0.25"
              max="3"
              step="0.25"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
            />
            <span className="speed-readout">{speed.toFixed(2)}x</span>
          </div>

          <div className="stage-display">
            <strong>Stage:</strong> {STAGE_NAMES[stageIndex]}
          </div>
        </div>
      </div>

      <div className="bt-main">
        <div className="cell-pane" role="region" aria-label="Cell diagram">
          <svg viewBox="0 0 500 500" className="cell-svg" onClick={onSvgClick}>
            {/* background */}
            <rect x="0" y="0" width="500" height="500" fill="#0f1720" rx="12" />

            {/* cell outer shapes */}
            {/* if membrane/wall exists part with radius will be present */}
            {cell.parts.map((p) => {
              if (p.radius) {
                // outer ring (membrane or wall)
                const stroke = selectedCellKey === "plant" && p.id === "cellwall" ? "#6fbf6f" : "#5aa4ff";
                return <circle key={p.id} cx={p.x} cy={p.y} r={p.radius} fill="rgba(0,0,0,0.0)" stroke={stroke} strokeWidth={p.id.includes("cellwall") ? 10 : 3} />;
              }
              return null;
            })}

            {/* nucleus or capsid visual */}
            {cell.parts.filter(p => p.id === "nucleus" || p.id === "nucleoid" || p.id === "capsid").map(n => (
              <g key={n.id}>
                <ellipse cx={n.x} cy={n.y} rx={60} ry={40} fill={selectedCellKey === "plant" ? "#2b2b8a" : "#332e8a"} opacity="0.9" />
                <text x={n.x} y={n.y - 48} className="nucleus-label">Nucleus</text>
              </g>
            ))}

            {/* render internal parts as icons (circles/rects) */}
            {cell.parts.map((p) => {
              if (p.radius) return null; // already handled outer shapes
              // small shapes for organelles
              if (p.id.startsWith("mito") || p.name.toLowerCase().includes("mitochond")) {
                return <ellipse key={p.id} cx={p.x} cy={p.y} rx="18" ry="10" fill="#ffb86b" stroke="#ff9e3d" strokeWidth="1.5" />;
              } else if (p.name.toLowerCase().includes("chlor")) {
                return <ellipse key={p.id} cx={p.x} cy={p.y} rx="16" ry="12" fill="#6be08b" stroke="#45c46a" strokeWidth="1.5" />;
              } else if (p.name.toLowerCase().includes("vacuole")) {
                return <rect key={p.id} x={p.x - 30} y={p.y - 20} width="60" height="40" rx="6" fill="#7fe0ff" opacity="0.85" stroke="#4fbcd6" strokeWidth="1" />;
              } else if (p.name.toLowerCase().includes("ribosome") || p.name.toLowerCase().includes("ribosom")) {
                return <circle key={p.id} cx={p.x} cy={p.y} r="8" fill="#ffd06b" />;
              } else if (p.name.toLowerCase().includes("golgi")) {
                return <rect key={p.id} x={p.x - 18} y={p.y - 10} width="36" height="20" rx="4" fill="#f7b7ff" stroke="#d88fe6" />;
              } else if (p.name.toLowerCase().includes("endoplasmic") || p.name.toLowerCase().includes("er")) {
                return <path key={p.id} d={`M${p.x - 28},${p.y} q20,-18 56,0 q-20,18 -56,0`} fill="#8fd1ff" stroke="#6fb8e8" strokeWidth="1.2" />;
              } else if (p.name.toLowerCase().includes("flagella")) {
                return <path key={p.id} d={`M${p.x - 40},${p.y} q40,10 80,0`} stroke="#e3e3e3" strokeWidth="3" fill="none" />;
              } else if (p.name.toLowerCase().includes("spike")) {
                return <line key={p.id} x1={p.x} y1={p.y} x2={p.x + 30} y2={p.y - 30} stroke="#ffd0d0" strokeWidth="3" />;
              } else {
                return <circle key={p.id} cx={p.x} cy={p.y} r="10" fill="#bde0ff" />;
              }
            })}

            {/* chromosomes (animated) */}
            {chromosomes.map((c, idx) => (
              <Chromosome key={c.id} id={c.id} x={c.x} y={c.y} angle={c.angle} />
            ))}

            {/* cytokinesis overlay */}
            {renderCytokinesisOverlay()}

            {/* hotspots (on top) */}
            {cell.parts.map((p) => (
              <Hotspot key={p.id} part={p} onClick={(part) => setSelectedPart(part)} />
            ))}

          </svg>
        </div>

        <aside className="info-pane" aria-live="polite">
          <h2>{cell.name}</h2>
          <p className="cell-desc">{cell.description}</p>

          <div className="part-info">
            <h3>Selected Part</h3>
            {selectedPart ? (
              <>
                <h4>{selectedPart.name}</h4>
                <p>{selectedPart.function}</p>
              </>
            ) : (
              <p>Click a hotspot inside the cell to view details.</p>
            )}
          </div>

          <div className="mitosis-legend">
            <h3>Mitosis Stages</h3>
            <ol>
              <li><strong>Interphase</strong> — DNA replication & growth.</li>
              <li><strong>Prophase</strong> — Chromosomes condense; spindle forms.</li>
              <li><strong>Metaphase</strong> — Chromosomes align at midline.</li>
              <li><strong>Anaphase</strong> — Sister chromatids pulled apart.</li>
              <li><strong>Telophase</strong> — Nuclear membranes reform.</li>
              <li><strong>Cytokinesis</strong> — Cell physically divides (cell plate in plants).</li>
            </ol>
          </div>
        </aside>
      </div>

      <footer className="bt-footer">
        <div className="stage-helpers">
          <small>Tip: Use Play to animate stages. Use Next/Prev to step manually.</small>
        </div>
      </footer>
    </div>
  );
}
