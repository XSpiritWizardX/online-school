import { useEffect, useRef } from "react";
import "./VideoConference.css";

export default function JitsiMeeting({
  roomName = "DefaultRoom",
  displayName = true,
}) {
  const containerRef = useRef(null);
  const apiRef = useRef(null);

  useEffect(() => {
    if (apiRef.current) return;

    const loadJitsi = () => {
      if (window.JitsiMeetExternalAPI) {
        apiRef.current = new window.JitsiMeetExternalAPI("8x8.vc", {
          roomName:
            "vpaas-magic-cookie-2a44de7e682247db852a0d209649a6a2/" + roomName,
          parentNode: containerRef.current,

          // Clean UI configuration

          interfaceConfigOverwrite: {
            TOOLBAR_ALWAYS_VISIBLE: true,
            SHOW_JITSI_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
            SHOW_BRAND_WATERMARK: false,
            SHOW_POWERED_BY: false,
            DEFAULT_LOGO_URL: "",
            SHOW_CHROME_EXTENSION_BANNER: false,
            MOBILE_APP_PROMO: false,
            HIDE_INVITE_MORE_HEADER: false,
          },
        });

        apiRef.current.addListener("videoConferenceJoined", () => {
          console.log("Jitsi meeting started!");
        });
      }
    };

    if (window.JitsiMeetExternalAPI) {
      loadJitsi();
    } else {
      const script = document.createElement("script");
      script.src =
        "https://8x8.vc/vpaas-magic-cookie-2a44de7e682247db852a0d209649a6a2/external_api.js";
      script.async = true;
      script.onload = loadJitsi;
      document.body.appendChild(script);
    }

    return () => {
      if (apiRef.current) {
        apiRef.current.dispose();
        apiRef.current = null;
      }
    };
  }, [roomName]);

  return (
    <div className="jitsi-wrapper">
      {displayName && <div className="room-name">{roomName}</div>}
      <div ref={containerRef} className="jitsi-container" />
    </div>
  );
}
