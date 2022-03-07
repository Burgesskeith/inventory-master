import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions";

function NavBar() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };
    return (
      <div className = "navBg">
        <div className="container">
          <div className="navbar">
            <div className="logo">
              <Link to="/">
                <img src="../images/logo.png" alt="logo" width="125px" />
              </Link>
            </div>
            <nav>
              <ul id="MenuItems">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/cart">Cart</Link>
                </li>
                {userInfo ? (
                  <li>
                    <Link to="/login" onClick={logoutHandler}>
                      Logout
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link to="/login">Sign In</Link>
                  </li>
                )}
              </ul>
            </nav>
            <Link to="/">
              <img src="../images/cart.png" width="30px" height="30px" alt="" />
            </Link>
            <img src="../images/menu.png" className="menu-icon" alt="menu" />
          </div>
        </div>
      </div>
    );
}

export default NavBar;
