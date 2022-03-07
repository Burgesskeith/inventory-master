import React from 'react';

function Footer() {
    return (
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="footer-col-2">
              <h3>Download Our App</h3>
              <p>Download App for Android and ios mobile phone.</p>
              <div className="app-logo">
                <img src="../images/play-store.png" alt="Play Store"/>
                <img src="../images/app-store.png" alt = "App Store"/>
              </div>
            </div>
          </div>
          <hr />
          <p className="copyright">Copyright 2022 - Lifestyle Fashion</p>
        </div>
      </div>
    );
}

export default Footer;
