
import React from "react";
import { Link, useLocation,useNavigate} from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  let navigate=useNavigate()
 const handleLogout=()=>{
   localStorage.removeItem('token');
   navigate('/Login');
 }
 const handleAdd=()=>{
  navigate('/Addnote')
 }
  return (
    <div>
<nav
  className=" navbar navbar-expand-lg bg-body-tertiary"
 
>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link  ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/About" ? "active" : ""
                  }`}
                  to="/About"
                >
                  About
                </Link>
              </li>
            </ul>
            <button type="button" className="btn btn-primary "onClick={handleAdd}>
  Add Note
</button>
            {!localStorage.getItem('token')? <form className="d-flex">
            
            </form>:<button className="btn btn-primary ms-2" onClick={handleLogout}>Logout</button>}


          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
