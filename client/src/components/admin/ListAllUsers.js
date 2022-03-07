import React from "react";
import Loading from "../Loading";
import Error from "../Error";
import { useSelector } from "react-redux";

function ListAllUsers(props) {
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error } = productDetails;

  let myList = props.list.map((user) => {
    return <li key={user}>User list member {user}</li>;
  });

  return (
    <>
      <div>
        {loading ? (
          <Loading />
        ) : error ? (
          <Error error={error} />
        ) : (
          <>
            <div className="userList">List of users</div>
            <ul>{myList}</ul>
          </>
        )}
      </div>
    </>
  );
}

export default ListAllUsers;
