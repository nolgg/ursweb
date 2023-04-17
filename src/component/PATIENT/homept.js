
import "./homept.css"
import React, { useState, useEffect } from 'react';
import { FiCode, FiMenu, FiX } from "react-icons/fi";
import './Headerpt.css';
import sr from './search.png';
import mp from './25.png';
import { Link } from 'react-router-dom';

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
            <h1 className="homept-bg" ></h1>
                    <h1 className="homept-bg1"></h1>
                      <button className="homept-btn" href="#"  style={{
                      color: "blue"
                    }}
                  >ที่นี่ </button>
                  <h2 className="homept-bg2"></h2>
                  <h2 className="homept-bg3"></h2>
                  <h3 className="homept-bg4">
                  <button className="homept-btn2" >
                  <Link  to="https://www.google.com/maps/search/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B8%9E%E0%B8%A2%E0%B8%B2%E0%B8%9A%E0%B8%B2%E0%B8%A5%E0%B9%83%E0%B8%81%E0%B8%A5%E0%B9%89%E0%B8%89%E0%B8%B1%E0%B8%99/@18.7950341,98.9831411,14z/data=!3m1!4b1?hl=th"  >โรงพยาบาลที่ใกล้เคียง</Link>
                  
                  <br></br>
                  <Link  style={{ fontSize:'30px'}}to="https://www.google.com/maps/search/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B8%9E%E0%B8%A2%E0%B8%B2%E0%B8%9A%E0%B8%B2%E0%B8%A5%E0%B9%83%E0%B8%81%E0%B8%A5%E0%B9%89%E0%B8%89%E0%B8%B1%E0%B8%99/@18.7950341,98.9831411,14z/data=!3m1!4b1?hl=th"  >Click Me</Link>
                 
                  
                  </button>
                  <img src={mp} style={{marginLeft:'260px',marginTop:'380px'}}/>
                
                  </h3>
                 
           </div>
       
    )
}

export default homedoc