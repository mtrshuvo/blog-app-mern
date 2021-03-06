import { useContext } from "react";
import { Link } from "react-router-dom";
import "./topbar.css";
import { Context } from "./../../context/Context";

function Topbar() {
    
  const PF = "http://localhost:5000/images/";
  const { user, dispatch } = useContext(Context);
  const handlelogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="top">
      <div className="topLeft"></div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link to="/" className="link">
              HOME
            </Link>
          </li>

          <li className="topListItem">
            <Link to="/write" className="link">
              WRITE
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/contact" className="link">
              CONTACT
            </Link>
          </li>
          <li className="topListItem" onClick={handlelogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <>
            <Link to="/settings">
              <img className="topImg" src={PF + user.profilePic} />
            </Link>
            <span style={{ marginLeft: "10px" }}>{user.username}</span>
          </>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              {" "}
              <Link to="/login" className="link">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link to="/register" className="link">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Topbar;
