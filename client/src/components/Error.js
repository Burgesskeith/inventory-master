import React from "react";

function Error({ error }) {
  return (
    <>
      <div className="alert">
        <h4>
          Error: <span className="alertMessage">{error}</span>
        </h4>
      </div>
    </>
  );
}

export default Error;
