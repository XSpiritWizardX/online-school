import { useState, useEffect, useRef } from "react";
import { CgMenuGridR } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import "./HomeDrop.css";
function HomeDrop() {
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const user = useSelector((store) => store.session.user);
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
<CgMenuGridR />
      </button>

      {showMenu && (
        <div className={"menu-profile-dropdown"} ref={ulRef}>

            <>
              <NavLink className='nav-link-menu-drop' to={`/courses`}>Explore Courses</NavLink>
              <NavLink className="nav-link-menu-drop" to={`/courses/${user.id}/enrolled`}>Degrees</NavLink>
              <NavLink className='nav-link-menu-drop' to={`/course-editor`}>Certificates</NavLink>
              <NavLink className='nav-link-menu-drop' to={`/settings/${user.id}`}>K-12</NavLink>





            </>



        </div>
      )}
    </>
  );
}

export default HomeDrop;
