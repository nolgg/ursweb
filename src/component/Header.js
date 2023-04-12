import React, { useState } from 'react'
import { FiCode, FiMenu, FiX } from "react-icons/fi";
import './Header.css'
import lg from './Group20.png'




function Header() { 

    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    console.log(click);
    const closeMobileMenu = () => setClick(false);

    return (
        <div className="header" style={{boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)'}}>
          <div className="container">
            <div className="header-con z-depth-0 fixed-top">
                    <div className="logo-container"  style={{marginLeft: "-100px",marginTop: '10px'}}>
                        <a href="Home"> <img img src={lg} style={{display:'relative' ,width:'150px',}}></img></a>
                    </div>
                    <ul className={click ? "menu active" : "menu"}>
                        <li className="menu-link" onClick={closeMobileMenu}>
                            <a href="/create">ADD PATIENT</a>
                        </li>
                        <li className="menu-link" onClick={closeMobileMenu}>
                            <a href="#">PATIENT</a>
                        </li>
                        <li className="menu-link" onClick={closeMobileMenu}>
                            <a href="Signup">SING UP</a>

                        </li>
                        {/* <li className="menu-link" onClick={closeMobileMenu}>
                            <link href="SignIn" >SignIn</link>
                            {links}
                        </li> */}
                       
                    </ul>
                    <div className="mobile-menu" onClick={handleClick}>
                        {click ? (
                            <FiX />
                        ) : (
                            <FiMenu />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
