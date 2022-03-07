import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="hero">
      <div className="container">
        <div className="row">
          <div className="col-2">
            <h1>
              Fashion Styles <br /> To Look Your Best!
            </h1>
            <h4>
              Looking for fashion that has the look but doesn't have a high
              price tag?{" "}
              <p>
                <br />
                Lifestyle womens fashion has what you're looking for.
              </p>{" "}
              <br />
              <p>
                Visit the shop and select the fashion that fits your style.
              </p>
            </h4>
            <Link to="/" className="btn">
              Shop now
            </Link>
          </div>
          <div className="col-2">
            <img src="images/main.png" alt="Woman in dress" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
