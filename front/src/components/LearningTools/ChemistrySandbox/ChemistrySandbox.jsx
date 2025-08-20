import { useState } from "react";
import "./ChemistrySandbox.css";
import ELEMENTS from "./elements";
import REACTIONS from "./reactions";

// --- helpers ---
const MAX_LOGS = 50;

function tally(list) {
  return list.reduce((acc, s) => {
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});
}

function applyOneReaction(sandbox) {
  const counts = tally(sandbox);

  const applicable = REACTIONS
    .filter(r =>
      Object.entries(r.inputs).every(([sym, qty]) => (counts[sym] || 0) >= qty)
    )
    .sort((a, b) => {
      const aSum = Object.values(a.inputs).reduce((s, n) => s + n, 0);
      const bSum = Object.values(b.inputs).reduce((s, n) => s + n, 0);
      if (bSum !== aSum) return bSum - aSum;
      return a.output.symbol > b.output.symbol ? 1 : -1;
    });

  if (!applicable.length) return { changed: false, nextSandbox: sandbox, log: null };

  const rxn = applicable[0];
  const next = [...sandbox];

  // remove required atoms
  for (const [sym, qty] of Object.entries(rxn.inputs)) {
    let remaining = qty;
    for (let i = 0; i < next.length && remaining > 0; i++) {
      if (next[i] === sym) {
        next.splice(i, 1);
        i--;
        remaining--;
      }
    }
  }

  // add product
  next.push(rxn.output.symbol);

  return {
    changed: true,
    nextSandbox: next,
    log: `Created ${rxn.output.name} (${rxn.output.symbol})`
  };
}

function reactGreedy(sandbox) {
  let current = [...sandbox];
  const logs = [];
  while (true) {
    const { changed, nextSandbox, log } = applyOneReaction(current);
    if (!changed) break;
    current = nextSandbox;
    if (log) logs.push(log);
  }
  return { nextSandbox: current, logs };
}

// --- component ---
export default function ChemistrySandbox() {
  const [sandbox, setSandbox] = useState([]);
  const [logs, setLogs] = useState([]);

  const addElement = (symbol) => setSandbox(prev => [...prev, symbol]);

  const reset = () => {
    setSandbox([]);
    setLogs([]);
  };

  const react = () => {
    const { nextSandbox, logs: rxnLogs } = reactGreedy(sandbox);
    setSandbox(nextSandbox);
    setLogs(prev => {
      const updated = rxnLogs.length ? [...rxnLogs.reverse(), ...prev] : ["No reaction occurred.", ...prev];
      return updated.slice(0, MAX_LOGS);
    });
  };

  return (
    <div className="sandbox-root">
      <header className="header">
        <h1>Periodic Table Sandbox</h1>
        <div className="controls">
          <button className="btn react" onClick={react}>React</button>
          <button className="btn reset" onClick={reset}>Reset</button>
        </div>
      </header>

      {/* MAIN GRID */}
      <section className="table-wrap">
        <div className="periodic-grid">
          {ELEMENTS.filter(e => e.row <= 7 && e.category !== "lanthanide" && e.category !== "actinide")
            .map(el =>
              el.category === "placeholder" ? (
                <div
                  key={el.symbol}
                  className="element-card placeholder"
                  style={{ gridColumn: el.column, gridRow: el.row }}
                  title={el.name}
                >
                  <div className="atomic">{el.atomicNumber}</div>
                  <div className="sym">{el.symbol}</div>
                  <div className="nm">{el.name}</div>
                </div>
              ) : (
                <button
                  key={el.symbol}
                  className={`element-card ${el.category}`}
                  style={{ gridColumn: el.column, gridRow: el.row }}
                  onClick={() => addElement(el.symbol)}
                  title={`${el.name} — click to add`}
                >
                  <div className="atomic">{el.atomicNumber}</div>
                  <div className="sym">{el.symbol}</div>
                  <div className="nm">{el.name}</div>
                </button>
              )
            )}
          {/* Lanthanide row */}
          {ELEMENTS.filter(e => e.category === "lanthanide").map(el => (
            <button
              key={el.symbol}
              className="element-card lanthanide"
              style={{ gridColumn: el.column, gridRow: el.row }}
              onClick={() => addElement(el.symbol)}
              title={`${el.name} — click to add`}
            >
              <div className="atomic">{el.atomicNumber}</div>
              <div className="sym">{el.symbol}</div>
              <div className="nm">{el.name}</div>
            </button>
          ))}
          {/* Actinide row */}
          {ELEMENTS.filter(e => e.category === "actinide").map(el => (
            <button
              key={el.symbol}
              className="element-card actinide"
              style={{ gridColumn: el.column, gridRow: el.row }}
              onClick={() => addElement(el.symbol)}
              title={`${el.name} — click to add`}
            >
              <div className="atomic">{el.atomicNumber}</div>
              <div className="sym">{el.symbol}</div>
              <div className="nm">{el.name}</div>
            </button>
          ))}
        </div>
      </section>

      {/* SANDBOX + LOGS */}
      <section className="panel">
        <div className="sandbox">
          <h2>Sandbox Atoms</h2>
          {sandbox.length === 0 ? (
            <p className="muted">Empty — click elements to add them.</p>
          ) : (
            <div className="chips">
              {sandbox.map((s, i) => (
                <span key={`${s}-${i}`} className="chip">{s}</span>
              ))}
            </div>
          )}
        </div>
        <div className="logs">
          <h2>Reaction Log</h2>
          {logs.length === 0 ? (
            <p className="muted">No reactions yet.</p>
          ) : (
            <ul>
              {logs.map((l, i) => <li key={i}>{l}</li>)}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
