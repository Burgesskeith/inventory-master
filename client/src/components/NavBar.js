import React from 'react';
import { Link } from 'react-router-dom';
function NavBar() {
    return (
        <div className='container'>
            <div className="navbar">
                <div className="logo">
                    <Link to="/"><img src="../images/logo.png" alt="logo" width="125px" /></Link>
                </div>
                <nav>
                    <ul id="MenuItems">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/">Cart</Link></li>
                        <li><Link to="/">Sign In</Link></li>
                    </ul>
                </nav>
                <Link to="/"><img src="../images/cart.png" width="30px" height="30px" /></Link>
                <img src="../images/menu.png" className="menu-icon" />
            </div>
        </div>
    )
}

export default NavBar;
