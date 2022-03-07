import React from "react";
import { useDispatch, useSelector } from 'react-redux';


function AdminHeader() {
  const adminDetails = useSelector((state) => state.userLogin.userInfo);
  const style = {
    "fontWeight": "bold",
    "color": "#333",
  }
  return (
    <div className="adminHeader">
      <div className="adminBar">
        <div>
          <h2>System Administration</h2>
        </div>
        <div>
          <p className="adminHeaderP">
            <span style={style}>Administrator:</span> {adminDetails.name}
          </p>
        </div>
        <div>
          <p className="adminHeaderP">
            <span style={style}>Email:</span> {adminDetails.email}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;
