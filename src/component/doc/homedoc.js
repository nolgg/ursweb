
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
                    <h2 className="homedoc-bg1"></h2>
                      <button className="font homedoc-btn" href="#AboutUs" 
                  ><a>CONTACT US</a> </button>
                  <h1 className="homedoc-bg2">
                 </h1>
                 <div className="font center " id="AboutUs" style={{backgroundColor:'#1776CF',color:'white'}}>
                 <h3 >About Us</h3>
                 <br></br>
                 <a style={{color:'white',fontSize:'4vh'}} >Contact Us :</a>
                 <br></br>
                 <a style={{color:'white',fontSize:'2.5vh'}} >Email : 38213@virtual.prc.ac.th</a>
                 <br></br>
                 <a style={{color:'white',fontSize:'2.5vh'}} >Call : 0946184499</a>
                 <br></br>
                 <a style={{color:'white',fontSize:'2.5vh'}} >Address : 117 Kaewnawarat Road, Wat Ket, Muang Chiang Mai, Chiang Mai, 50000.</a>
                 
                 

                 </div>
                 
           </div>
       
    )
}

export default Homedoc;