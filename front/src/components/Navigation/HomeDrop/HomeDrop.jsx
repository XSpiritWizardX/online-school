import { useState, useEffect, useRef } from "react";
import { HiOutlineBars3 } from "react-icons/hi2";
import { NavLink } from "react-router-dom";

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
      <button className="menu-button" onClick={toggleMenu}>
        <HiOutlineBars3 />
      </button>

      {showMenu && (
        <div className={"menu-profile-dropdown"} ref={ulRef}>

            <>
              <NavLink className='nav-link-menu-drop' to={`/courses`}>Explore Courses</NavLink>
              <NavLink className="nav-link-menu-drop" to={`/degrees`}>Degrees</NavLink>
              <NavLink className='nav-link-menu-drop' to={`/certificates`}>Certificates</NavLink>
              <NavLink className='nav-link-menu-drop' to={`/k-12`}>K-12</NavLink>


            </>



        </div>
      )}
    </>
  );
}

export default HomeDrop;
