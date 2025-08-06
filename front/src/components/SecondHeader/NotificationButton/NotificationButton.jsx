import { useState, useEffect, useRef } from "react";
import {  useSelector } from "react-redux";
import { IoIosNotificationsOutline } from "react-icons/io";


import "./NotificationButton.css";
function NotificationButton() {
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
      <button className="notification-button" onClick={toggleMenu}>
<IoIosNotificationsOutline />
      </button>

      {showMenu && (
        <div className={"notification-dropdown"} ref={ulRef}>
          {user ? (
            <>
              <div className="not-title">Notifications</div>
            <div
            className="notif-example"
            >
           <p>Notification example</p>
            </div>
            <div
            className="notif-example"
            >
           <p>Notification example</p>
            </div>
            <div
            className="notif-example"
            >
           <p>Notification example</p>
            </div>
            <div
            className="notif-example"
            >
           <p>Notification example</p>
            </div>
            <div
            className="notif-example"
            >
           <p>Notification example</p>
            </div>
               <button
            className="see-more-messages">See More Notifications</button>


            </>
          ) : (
            <div className="notification-dropdown-items">
                <h1>please log in</h1>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default NotificationButton;
