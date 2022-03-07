import React from "react";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <div className="offer">
      <div className="small-container">
        <div className="row">
          <div className="col-2">
            <img src="images/exclusive.png" className="offer-img" alt="" />
          </div>
          <div className="col-2">
            <p>Exclusively Available on Lofestyle Store</p>
            <h1>Fitness Watch 3</h1>
            <small>
              The Fitness Smart Watch 3 fearures a 23% larger AMOLED
              color full-touch display with adjustable brightness, so everything
              is clear as can be.
              <br />
            </small>
            <Link to="/" className="btn">
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
