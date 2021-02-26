import React from 'react'
import { Link } from 'react-router-dom'
import "../css/NavBar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <h4><Link className="navbarLink" to="/">Home</Link></h4>
            <h4><Link className="navbarLink" to="/explore">Explore Lists</Link></h4>
        </nav>
    )
}

export default Navbar