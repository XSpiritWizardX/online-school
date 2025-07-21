import { useEffect, useRef, useState } from "react";
import VexFlow from "vexflow";
import * as Tone from "tone";
import "./SheetMusicDisplay.css";

const SheetMusicDisplay = () => {
  const containerRef = useRef(null);
  const [easyScoreString, setEasyScoreString] = useState("C4/q, D4, E4, F4");
  const [timeSignature, setTimeSignature] = useState("4/4");
  const [keySignature, setKeySignature] = useState("C");
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const VF = VexFlow;
    if (!VF || !VF.Factory) return;

    const container = containerRef.current;
    container.innerHTML = "";

    const vf = new VF.Factory({ renderer: { elementId: container } });
    const score = vf.EasyScore();
    const system = vf.System();

    system
      .addStave({
        voices: [score.voice(score.notes(easyScoreString))]
      })
      .addClef("treble")
      .addTimeSignature(timeSignature)
      .addKeySignature(keySignature);

    vf.draw();
  }, [easyScoreString, timeSignature, keySignature]);

  const parseEasyScoreNotes = (scoreStr) => {
    return scoreStr.split(",").map((n) => {
      const match = n.trim().match(/([A-Ga-g#b]+[0-9])(?:\/([0-9]+))?/);
      return match ? { note: match[1], duration: match[2] || "4" } : null;
    }).filter(Boolean);
  };

  const handlePlayback = async () => {
    await Tone.start();
    const synth = new Tone.Synth().toDestination();
    let now = Tone.now();
    const parsedNotes = parseEasyScoreNotes(easyScoreString);

    parsedNotes.forEach((n, i) => {
      synth.triggerAttackRelease(n.note, "4n", now + i * 0.5);
    });
  };

  const handleDownloadAudio = async () => {
    await Tone.start();
    setIsRecording(true);

    const synth = new Tone.Synth().toDestination();

    const audioCtx = Tone.getContext().rawContext;
    const dest = audioCtx.createMediaStreamDestination();
    synth.connect(dest);

    const recorder = new MediaRecorder(dest.stream);
    const chunks = [];

    recorder.ondataavailable = e => chunks.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "audio/wav" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "composition.wav";
      a.click();
      setIsRecording(false);
    };

    recorder.start();

    // Playback notes
    const now = Tone.now();
    const parsedNotes = parseEasyScoreNotes(easyScoreString);
    parsedNotes.forEach((n, i) => {
      synth.triggerAttackRelease(n.note, "4n", now + i * 0.5);
    });

    // Stop recording after playback
    setTimeout(() => {
      recorder.stop();
    }, parsedNotes.length * 500 + 1000);
  };

  const appendToScore = (snippet) => {
    setEasyScoreString((prev) => prev + ", " + snippet);
  };

  return (
    <div className="sheet-editor-wrapper">
      <div className="sheet-editor-display" ref={containerRef}></div>

      <div className="sheet-editor-controls">
        <textarea
          rows={3}
          value={easyScoreString}
          onChange={(e) => setEasyScoreString(e.target.value)}
          placeholder="EasyScore: e.g. C4/q, D4, (C4 E4 G4)/q, B4/8/r"
        />

        <div className="sheet-editor-options">
          <label>🕓 Time Signature:</label>
          <select value={timeSignature} onChange={(e) => setTimeSignature(e.target.value)}>
            <option value="4/4">4/4</option>
            <option value="3/4">3/4</option>
            <option value="6/8">6/8</option>
          </select>

          <label>🎵 Key Signature:</label>
          <select value={keySignature} onChange={(e) => setKeySignature(e.target.value)}>
            <option value="C">C</option>
            <option value="G">G</option>
            <option value="D">D</option>
            <option value="A">A</option>
            <option value="E">E</option>
            <option value="F">F</option>
            <option value="Bb">Bb</option>
            <option value="Eb">Eb</option>
          </select>
        </div>

        <div className="sheet-editor-buttons">
          <button onClick={handlePlayback}>▶️ Play</button>
          <button onClick={handleDownloadAudio} disabled={isRecording}>
            💾 Save as Audio
          </button>
        </div>

        <div className="sheet-editor-snippets">
          <p>Quick Add:</p>
          <button onClick={() => appendToScore("C4/q, D4, E4, F4")}>🎼 Scale</button>
          <button onClick={() => appendToScore("(C4 E4 G4)/q")}>🎹 Chord</button>
          <button onClick={() => appendToScore("A4/8.")}>🎵 Dotted Note</button>
          <button onClick={() => appendToScore("B4/8/r")}>🛑 Rest</button>
          <button onClick={() => appendToScore("A4/8, E4, C4, D4")}>👣 Beamed Notes</button>
          <button onClick={() => appendToScore("(A4/8, E4, C4)")}>🎶 Triplet</button>
        </div>
      </div>
    </div>
  );
};

export default SheetMusicDisplay;
