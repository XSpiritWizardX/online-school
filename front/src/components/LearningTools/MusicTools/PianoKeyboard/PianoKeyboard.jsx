import { useEffect, useRef, useState, useCallback } from 'react';
import * as Tone from 'tone';
import './PianoKeyboard.css';

const NOTES = [
  'C4','C#4','D4','D#4','E4','F4','F#4','G4','G#4','A4','A#4','B4',
  'C5','C#5','D5','D#5','E5','F5','F#5','G5','G#5','A5','A#5','B5',
  'C6','C#6','D6','D#6','E6','F6','F#6','G6','G#6','A6','A#6','B6',
  'C7','C#7','D7','D#7','E7','F7','F#7','G7'
];

const KEY_MAP = {
  'z': 'C4', 's': 'C#4', 'x': 'D4', 'd': 'D#4', 'c': 'E4',
  'v': 'F4', 'g': 'F#4', 'b': 'G4', 'h': 'G#4', 'n': 'A4',
  'j': 'A#4', 'm': 'B4',
  'q': 'C5', '2': 'C#5', 'w': 'D5', '3': 'D#5', 'e': 'E5',
  'r': 'F5', '5': 'F#5', 't': 'G5', '6': 'G#5', 'y': 'A5',
  '7': 'A#5', 'u': 'B5',
  'i': 'C6', '9': 'C#6', 'o': 'D6', '0': 'D#6', 'p': 'E6'
};

const PianoKeyboard = () => {
  const synthRef = useRef(null);
  const [recording, setRecording] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const startTimeRef = useRef(null);

  const playNote = useCallback((note) => {
    synthRef.current.triggerAttackRelease(note, '8n');
    if (isRecording && startTimeRef.current !== null) {
      const time = Tone.now() - startTimeRef.current;
      setRecording((prev) => [...prev, { note, time }]);
    }
    const el = document.querySelector(`.piano-key[data-note='${note}']`);
    if (el) {
      el.classList.add('active');
      setTimeout(() => el.classList.remove('active'), 150);
    }
  }, [isRecording]);

  useEffect(() => {
    synthRef.current = new Tone.PolySynth().toDestination();
    const handleKeyDown = (e) => {
      const note = KEY_MAP[e.key];
      if (note) playNote(note);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playNote]);

  const handleRecord = () => {
    setRecording([]);
    setIsRecording(true);
    startTimeRef.current = Tone.now();
  };

  const handleStop = () => {
    setIsRecording(false);
    startTimeRef.current = null;
  };

  const handlePlay = async () => {
    setIsPlaying(true);
    await Tone.start();
    for (let i = 0; i < recording.length; i++) {
      const { note, time } = recording[i];
      Tone.Transport.scheduleOnce(() => playNote(note), '+' + time);
    }
    Tone.Transport.start();
    setTimeout(() => {
      Tone.Transport.stop();
      Tone.Transport.cancel();
      setIsPlaying(false);
    }, (recording.at(-1)?.time || 0) * 1000 + 500);
  };

  const handleClear = () => {
    setRecording([]);
  };

  const handleSubmit = () => {
    alert("Submitted recording: " + JSON.stringify(recording));
  };

  return (
    <div className="piano-wrapper">
      <div className="piano-controls">
        <button onClick={handleRecord} disabled={isRecording}>Record</button>
        <button onClick={handleStop} disabled={!isRecording}>Stop</button>
        <button onClick={handlePlay} disabled={isRecording || isPlaying || !recording.length}>Play</button>
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div className="piano-container">
        {NOTES.map((note) => (
          <div
            key={note}
            data-note={note}
            onClick={() => playNote(note)}
            className={`piano-key ${note.includes('#') ? 'black' : 'white'}`}
          >
            {note}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PianoKeyboard;
