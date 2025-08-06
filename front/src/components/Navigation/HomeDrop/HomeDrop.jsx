import { useState, useEffect, useRef } from "react";
import { CgMenuGridR } from "react-icons/cg";


import "./HomeDrop.css";
function HomeDrop() {
  const [showMenu, setShowMenu] = useState(false);
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
      <button className="profile-button" onClick={toggleMenu}>
<CgMenuGridR />
      </button>

      {showMenu && (
        <div className={"menu-profile-dropdown"} ref={ulRef}>

            <>


            <div
            className="notif-example"
            >
           <p>Explore Courses</p>
            </div>
            <div
            className="notif-example"
            >
           <p>Degrees</p>
            </div>
            <div
            className="notif-example"
            >
           <p>Certificates</p>
            </div>
            <div
            className="notif-example"
            >
           <p>K-12</p>
            </div>



            </>



        </div>
      )}
    </>
  );
}

export default HomeDrop;
