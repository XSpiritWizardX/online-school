import { useRef, useState, useEffect } from "react";
import io from "socket.io-client";
import "./VideoConference.css";

const SOCKET_SERVER_URL = "http://localhost:5000"; // Change to your backend

function VideoConference({ roomId, userName }) {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const cameraStreamRef = useRef(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [screenSharing, setScreenSharing] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [showWhiteboard, setShowWhiteboard] = useState(false);
  const [whiteboardTool, setWhiteboardTool] = useState("pen");
  const [showBreakout, setShowBreakout] = useState(false);
  const [screenStream, setScreenStream] = useState(null);

  const socketRef = useRef();
  const peerConnectionRef = useRef();

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL);

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      localVideoRef.current.srcObject = stream;
      cameraStreamRef.current = stream;

      peerConnectionRef.current = new window.RTCPeerConnection();
      stream.getTracks().forEach(track => peerConnectionRef.current.addTrack(track, stream));

      peerConnectionRef.current.ontrack = (event) => {
        remoteVideoRef.current.srcObject = event.streams[0];
      };

      socketRef.current.emit("join", { roomId, userName });

      socketRef.current.on("offer", async (offer) => {
        await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peerConnectionRef.current.createAnswer();
        await peerConnectionRef.current.setLocalDescription(answer);
        socketRef.current.emit("answer", { roomId, answer });
      });

      socketRef.current.on("answer", async (answer) => {
        await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
      });

      socketRef.current.on("candidate", async (candidate) => {
        try {
          await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (e) {}
      });

      peerConnectionRef.current.onicecandidate = (event) => {
        if (event.candidate) {
          socketRef.current.emit("candidate", { roomId, candidate: event.candidate });
        }
      };

      socketRef.current.on("ready", async () => {
        const offer = await peerConnectionRef.current.createOffer();
        await peerConnectionRef.current.setLocalDescription(offer);
        socketRef.current.emit("offer", { roomId, offer });
      });
    });

    socketRef.current.on("chat", (msg) => {
      setChatMessages((prev) => [...prev, msg]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId, userName]);

  // Chat send
  const sendMessage = () => {
    socketRef.current.emit("chat", { userName, message });
    setChatMessages((prev) => [...prev, { userName, message }]);
    setMessage("");
  };

  // Screen share
  const handleScreenShare = async () => {
    if (!screenSharing) {
      const screenStreamObj = await navigator.mediaDevices.getDisplayMedia({ video: true });
      setScreenStream(screenStreamObj);
      setScreenSharing(true);

      // Replace video track for remote peer
      const videoTrack = screenStreamObj.getVideoTracks()[0];
      const sender = peerConnectionRef.current.getSenders().find(s => s.track.kind === "video");
      sender.replaceTrack(videoTrack);

      // When screen share ends, revert to camera
      videoTrack.onended = () => {
        sender.replaceTrack(cameraStreamRef.current.getVideoTracks()[0]);
        setScreenStream(null);
        setScreenSharing(false);
      };
    }
  };

  // Recording
  const handleRecord = () => {
    if (!isRecording) {
      const stream = localVideoRef.current.srcObject;
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) setRecordedChunks((prev) => [...prev, e.data]);
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } else {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const downloadRecording = () => {
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "recording.webm";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    setRecordedChunks([]);
  };

  // Mic toggle
  const handleMicToggle = () => {
    const stream = localVideoRef.current.srcObject;
    stream.getAudioTracks().forEach(track => (track.enabled = !micOn));
    setMicOn(!micOn);
  };

  // Video toggle
  const handleVideoToggle = () => {
    const stream = localVideoRef.current.srcObject;
    stream.getVideoTracks().forEach(track => (track.enabled = !videoOn));
    setVideoOn(!videoOn);
  };

  // Leave meeting
  const handleLeave = () => {
    socketRef.current.disconnect();
    window.location.reload();
  };

  // Whiteboard tool change
  const handleWhiteboardTool = (e) => {
    setWhiteboardTool(e.target.value);
  };

  return (
    <div className="video-conference">
      <div className="invite-link-section">
        <span>Invite others:</span>
        <input
          type="text"
          value={`${window.location.origin}/conference/${roomId}`}
          readOnly
          className="invite-link-input"
        />
        <button
          onClick={() => {
            navigator.clipboard.writeText(`${window.location.origin}/conference/${roomId}`);
            alert("Invite link copied!");
          }}
          className="invite-link-btn"
        >
          Copy Invite Link
        </button>
      </div>
      <div className="video-main">
        <div className="video-windows">
          <div className="video-box speaker-view">
            <video ref={localVideoRef} autoPlay playsInline />
            <span className="video-label">You</span>
          </div>
          {screenSharing && screenStream && (
            <div className="video-box share-view">
              <video
                autoPlay
                playsInline
                srcObject={screenStream}
                ref={el => {
                  if (el && screenStream) el.srcObject = screenStream;
                }}
              />
              <span className="video-label">Your Screen</span>
            </div>
          )}
          <div className="video-box share-view">
            <video ref={remoteVideoRef} autoPlay playsInline />
            <span className="video-label">Speaker/Screen</span>
          </div>
        </div>
        <div className="conference-controls">
          <button onClick={handleMicToggle}>
            {micOn ? "Mute Mic" : "Unmute Mic"}
          </button>
          <button onClick={handleVideoToggle}>
            {videoOn ? "Stop Video" : "Start Video"}
          </button>
          <button onClick={() => setShowChat(!showChat)}>
            {showChat ? "Hide Chat" : "Chat"}
          </button>
          <button onClick={handleScreenShare}>
            {screenSharing ? "Stop Share" : "Share Screen"}
          </button>
          <button onClick={handleRecord}>
            {isRecording ? "Stop Recording" : "Record Session"}
          </button>
          {recordedChunks.length > 0 && (
            <button onClick={downloadRecording}>Download</button>
          )}
          <button onClick={() => setShowWhiteboard(!showWhiteboard)}>
            {showWhiteboard ? "Hide Whiteboard" : "Whiteboard"}
          </button>
          {showWhiteboard && (
            <select
              className="whiteboard-dropdown"
              value={whiteboardTool}
              onChange={handleWhiteboardTool}
            >
              <option value="pen">Pen</option>
              <option value="highlighter">Highlighter</option>
              <option value="eraser">Eraser</option>
              <option value="shape">Shape</option>
            </select>
          )}
          <button onClick={() => setShowBreakout(!showBreakout)}>
            {showBreakout ? "Close Breakout" : "Breakout Rooms"}
          </button>
          <button className="leave-btn" onClick={handleLeave}>
            Leave Meeting
          </button>
        </div>
      </div>
      {showChat && (
        <div className="chat-side-panel">
          <div className="chat-messages">
            {chatMessages.map((msg, i) => (
              <div key={i}>
                <b>{msg.userName}:</b> {msg.message}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
      {showWhiteboard && (
        <div className="whiteboard-panel">
          <div className="whiteboard-header">
            <span>Whiteboard ({whiteboardTool})</span>
          </div>
          <div className="whiteboard-canvas">
            {/* Implement drawing tool here */}
            <span style={{ color: "#888" }}>Whiteboard canvas goes here.</span>
          </div>
        </div>
      )}
      {showBreakout && (
        <div className="breakout-panel">
          <div className="breakout-header">
            <span>Breakout Rooms</span>
          </div>
          <div className="breakout-content">
            <span style={{ color: "#888" }}>Breakout room controls go here.</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoConference;
