import React, {useEffect} from 'react'
import {RiLogoutBoxLine, RiHome2Line} from "react-icons/ri"
import {BsTwitter} from "react-icons/bs"
import {HiHome} from "react-icons/hi"
import {CgProfile} from "react-icons/cg"
import {FiMail} from "react-icons/fi"
import {BiHomeCircle} from "react-icons/bi"
import { Link, NavLink } from "react-router-dom"

export default function SideNavbar() {
    const messages = 0;
    return (
        <div className='sidenav'>
            <ul className='navbar'>
                <li>
                    <Link to="/">
                        <i className='icon' id='twitter'><BsTwitter /></i>
                    </Link>
                </li>
                <li>
                    {/* <NavLink to="/"> */}
                        <i className='icon'><BiHomeCircle /></i>
                        <span className='navbar-el'>Home</span>
                    {/* </NavLink> */}
                </li>
                <li>
                    {/* <NavLink to="/profile"> */}
                        <i className='icon'><CgProfile /></i>
                        <span className='navbar-el'>Profile</span>
                    {/* </NavLink> */}
                </li>
                <li>
                    {/* <NavLink to="/messages"> */}
                        <i className='icon'><FiMail /></i>
                        <span className='navbar-el'>Messages</span>
                    {/* </NavLink> */}
                </li>
                <li>
                    {/* <NavLink to="/"> */}
                        <i className='icon'><RiLogoutBoxLine /></i>
                        <span className='navbar-el'>Logout</span>
                    {/* </NavLink> */}
                </li>
            </ul>
        </div>
    )
}
