
import './BlankPage.css'
import { NavLink } from 'react-router-dom';
function BlankPage() {



  return (

    <div className='delete-confirm'>
      <h1>Feature Coming Soon</h1>
        <NavLink
        to="/"
        >
            <button>Back To Home</button>
        </NavLink>

    </div>


  );
}






export default BlankPage;
