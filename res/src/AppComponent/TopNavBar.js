import React from 'react'
import '../App.css';
import {Link} from 'react-router-dom'
export default function TopNavBar() {
    return (
        <div className="TopNavBar">
            <ul >
                <Link to="/">
                <li>Home</li>
                </Link>
                <Link to="/Booking">
                <li>Booking</li>
                </Link>
                <Link to="/Menu">
                <li>Menu</li>
                </Link>
                <Link to="/Login">
                <li>Login</li>
                </Link>
            </ul>
        </div>
    )
}
