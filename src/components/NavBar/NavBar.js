import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = (props) => {
    return (
        <div className="navBar">
            <nav style={{borderBottom: "solid 1px", paddingBottom: "1rem",}}>
                <Link to="/">Login</Link> |{" "}
                <Link to="/sheet">Get the Sheet!</Link>|{" "}
                <Link to="/key">Get the Key!</Link>
            </nav>
        </div>
    )
}

export default NavBar;