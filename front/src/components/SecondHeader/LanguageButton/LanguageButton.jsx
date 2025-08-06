import { useState, useEffect, useRef } from "react";
import {  useSelector } from "react-redux";
import { TbWorld } from "react-icons/tb";


import "./LanguageButton.css";
function LanguageButton() {
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    // Keep from bubbling up to document and triggering closeMenu
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return undefined;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);




  return (
    <>
      <button className="messages-button" onClick={toggleMenu}>
<TbWorld />
      </button>

      {showMenu && (
        <div className={"messages-dropdown"} ref={ulRef}>
          {user ? (
            <>
              <div
              className="lang-title"
              >Languages</div>

            <div
            className="notif-example"
            >
           <p>English</p>
            </div>
            <div
            className="notif-example"
            >
           <p>Mandarin Chinese</p>
            </div>
            <div
            className="notif-example"
            >
           <p>Hindi</p>
            </div>
            <div
            className="notif-example"
            >
           <p>Spanish</p>
            </div>
            <div
            className="notif-example"
            >
           <p>Modern Standard Arabic</p>
            </div>
            <button
            className="see-more-messages">See More Languages</button>


            </>
          ) : (
            <div className="messages-dropdown-items">
                <h1>please log in</h1>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default LanguageButton;
