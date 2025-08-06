import { useState, useEffect, useRef } from "react";
import {  useSelector } from "react-redux";
import { TiMessages } from "react-icons/ti";


import "./MessagesButton.css";
function MessagesButton() {
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
<TiMessages />
      </button>

      {showMenu && (
        <div className={"messages-dropdown"} ref={ulRef}>
          {user ? (
            <>
              <div
              className="message-title"
              >Messages</div>

            <div
            className="notif-example"
            >
           <p>message example</p>
            </div>
            <div
            className="notif-example"
            >
           <p>message example</p>
            </div>
            <div
            className="notif-example"
            >
           <p>message example</p>
            </div>
            <div
            className="notif-example"
            >
           <p>message example</p>
            </div>
            <div
            className="notif-example"
            >
           <p>message example</p>
            </div>
            <button
            className="see-more-messages">See More Messages</button>


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

export default MessagesButton;
