import "./CookieBanner.css";
import { useState } from "react";
const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleAccept = () => {
    setIsVisible(false);
  };

  const handleDecline = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-banner">
      <p>
        We use cookies to improve your experience on Online School. By
        using our site, you agree to our{" "}
        <a
          href="/cookies-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cookies Policy
        </a>
        .
      </p>
      <div className="cookie-buttons">
        <button onClick={handleAccept}>Accept</button>
        <button onClick={handleDecline}>Decline</button>
      </div>
    </div>
  );
};

export default CookieBanner;
