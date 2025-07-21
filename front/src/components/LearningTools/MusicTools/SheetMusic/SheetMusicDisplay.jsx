import { useEffect, useRef } from "react";
import Vex from "vexflow";
import "./SheetMusicDisplay.css";

const SheetMusicDisplay = ({ notes }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!Vex?.Flow?.Renderer) return;

    const VF = Vex.Flow;
    const div = containerRef.current;
    div.innerHTML = "";

    const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
    renderer.resize(800, 200);
    const context = renderer.getContext();
    context.setFont("Arial", 10).setBackgroundFillStyle("#fff");

    const stave = new VF.Stave(10, 40, 700);
    stave.addClef("treble").addTimeSignature("4/4");
    stave.setContext(context).draw();

    if (!Array.isArray(notes) || notes.length === 0) return;

    let vexNotes = [];
    try {
      vexNotes = notes.map((note) => {
        // Validate input note format, e.g., 'c/4' or 'c#/4'
        const pitch = /^[a-gA-G](#|b)?\/[0-9]$/.test(note)
          ? note
          : "c/4";
        return new VF.StaveNote({
          clef: "treble",
          keys: [pitch],
          duration: "q",
        });
      });
    } catch (error) {
      console.error("Error creating VexFlow notes:", error);
      return;
    }

    const voice = new VF.Voice({ num_beats: 4, beat_value: 4 });
    voice.addTickables(vexNotes);

    try {
      const formatter = new VF.Formatter()
        .joinVoices([voice])
        .format([voice], 600);
      voice.draw(context, stave);
    } catch (error) {
      console.error("Error drawing VexFlow voice:", error);
    }
  }, [notes]);

  return (
    <div className="sheet-music-display" ref={containerRef}></div>
  );
};

export default SheetMusicDisplay;
