import React from "react";
import AdminHeader from "./admin/AdminHeader";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions";
import ListAllUsers from "./admin/ListAllUsers";
import axios from "axios";

function Admin() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };
  const handleAllUserList = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: { "x-auth-key": userInfo.token },
      };
      let res = await axios.get("/api/users/", config);
      console.log(res.data);
      //  add users to state & add screen to show
    } catch (error) {
      console.log(error);
    }
  };
  return (
    
    <div className="container">
      <AdminHeader />
      <main className="adminContainer">
        <div className="adminLeftCol">
          <h2 className="adminH2">User</h2>
          <ul>
            <li className="bodyP">
              <a href="#">Add New User</a>
            </li>
            <li className="bodyP">Update User</li>
            <li className="bodyP">Delete User</li>
          </ul>
          <div onClick={handleAllUserList}>
            <div className="bodyP">All Users</div>
          </div>
          <h2 className="adminH2">Product</h2>
          <ul>
            <li className="bodyP">Add New Product</li>
            <li className="bodyP">Update Product</li>
            <li className="bodyP">Delete Product</li>
            <li className="bodyP">
              <Link to="/login" onClick={logoutHandler}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
        <div className="adminRightCol">
          <ListAllUsers list={[1,2,3]}/>
        </div>
      </main>
    </div>
  );
}

export default Admin;
