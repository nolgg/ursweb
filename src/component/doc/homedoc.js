
import "./homedoc.css"
import React, { useState, useEffect } from 'react';
import { FiCode, FiMenu, FiX } from "react-icons/fi";
import './HeaderDoc.css';
import lg from '../Group52.png';

// let homeData = {
//     title: "React landing page",
//     desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam velit iure aut delectus sapiente omnis adipisci expedita ipsam, possimus impedit minus vero dolor? Reprehenderit eveniet, minus pariatur aperiam voluptate labore?"
// }


function Homedoc() {
    const [click, setClick] = useState(false);
const handleClick = () => setClick(!click);
const closeMobileMenu = () => setClick(false);
    return (
           <div className="divmain">
            <h1 className="homedoc-bg" ></h1>
                    <h1 className="homedoc-bg1"></h1>
                      <button className="homedoc-btn" href="#" 
                  ><a>CONTACT US</a> </button>
                  <h1 className="homedoc-bg2">
                 </h1>
                 
           </div>
       
    )
}

export default Homedoc;