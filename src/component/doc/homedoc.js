
import "./homedoc.css"
import React, { useState, useEffect } from 'react';
import { FiCode, FiMenu, FiX } from "react-icons/fi";
import './HeaderDoc.css';
import lg from '../Group52.png';

// let homeData = {
//     title: "React landing page",
//     desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam velit iure aut delectus sapiente omnis adipisci expedita ipsam, possimus impedit minus vero dolor? Reprehenderit eveniet, minus pariatur aperiam voluptate labore?"
// }


function homedoc() {
    const [click, setClick] = useState(false);
const handleClick = () => setClick(!click);
const closeMobileMenu = () => setClick(false);
    return (
           <div>
            <h1 className="homedoc-bg" ></h1>
                    <h1 className="homedoc-bg1"></h1>
                      <button className="homedoc-btn" href="#"  style={{
                      color: "white"
                    }}
                  >CONTACT US </button>
                  <h2 className="text1">1.นำสตริปที่ได้จากการตรวจปัสสาวะเข้าเครื่องอ่านแถบทดสอบของ URS
                 </h2>
                 
           </div>
       
    )
}

export default homedoc