
import { useSelector } from "react-redux";
import "./SecondHeader.css";
import NotificationButton from "./NotificationButton/NotificationButton";
import MessagesButton from "./MessagesButton/MessagesButton";
import LanguageButton from "./LanguageButton/LanguageButton";
import ShoppingCart from "./ShoppingCart/ShoppingCart";
function SecondHeader() {
  const user = useSelector((state) => state.session.user);


  return (
    <>
        {user ? (
        <div
            className="second-header"
        >

        <div
            className="second-header-left"
        >
            <h2
            className="second-head-info"
            >Current Example Course Name</h2>
            <h2
            className="second-head-info"
            >Current Example Course Lesson 1.3</h2>
          <button
          className="progress-button"

          >
            view progress
          </button>
        </div>

        <div className="second-header-right">
          <ShoppingCart/>
          <LanguageButton/>
          <MessagesButton/>
          <NotificationButton/>
        </div>
        </div>





        ) : (





        <div className="second-header-hidden">
          <h2>Please log in</h2>
        </div>





        )}
    </>
  );
}

export default SecondHeader;
