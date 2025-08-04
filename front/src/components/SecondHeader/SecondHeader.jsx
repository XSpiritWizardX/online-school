
import { useSelector } from "react-redux";
import "./SecondHeader.css";


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
            <h2>Course Name</h2>
            <h2>Current Lesson 1.3</h2>
        </div>

        <div className="second-header-right">
          <h2>Welcome to the Second Header</h2>
          <p> {user.email} is logged in</p>
          <button
          className="progress-button"
          
          >
            view progress
          </button>
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
