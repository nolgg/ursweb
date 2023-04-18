import "./homept.css"
import React, { useState, useEffect } from 'react';
import { FiCode, FiMenu, FiX } from "react-icons/fi";
import './Headerpt.css';
import sr from './search.png';
import pic1 from './1.png'
import pic2 from './2.png'
import pic3 from './3.png'
import pic4 from './4.png'
import pic5 from './5.png'

import { Link } from 'react-router-dom';

// let homeData = {
//     title: "React landing page",
//     desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam velit iure aut delectus sapiente omnis adipisci expedita ipsam, possimus impedit minus vero dolor? Reprehenderit eveniet, minus pariatur aperiam voluptate labore?"
// }


function Homept() {
    const [click, setClick] = useState(false);
const handleClick = () => setClick(!click);
const closeMobileMenu = () => setClick(false);
    return (
           <div>
            <h1 className="homept-bg" ></h1>
                    <h1 className="homept-bg1"></h1>
                      <button className="homept-btn center" href="/Resultpatient"  style={{
                      color: "blue"
                    }}
                  >ที่นี่ </button>
           
                  <h2 className="homept-bg3"></h2>
                  <h3 className="homept-bg4"></h3>
                 
                 

   <div className="h3dc">
   <p className="center"style={{fontSize: '40px',color: '#1776CF'}}>
    ถ้าคุณมีอาการอย่างใดอย่างหนึ่งต่อไปนี้<br></br>
    คุณอาจเสี่ยงเป็นโรคนิ่ว ควรพบแพทย์โดยด่วน</p>
  <div class="row row-cols-5 ">      

  <div class="col">
    <a href="#">
      <img src={pic1} alt="Image 1" class="img-fluid" style={{height: "700px", width:"300px"}}></img>
    </a>
  </div>
  <div class="col">
    <a href="#">
      <img src={pic2} alt="Image 2" class="img-fluid" style={{height: "700px", width:"300px"}}></img>
    </a>
  </div>
  <div class="col">
    <a href="#">
      <img src={pic3} alt="Image 3" class="img-fluid" style={{height: "700px", width:"300px"}}></img>
    </a>
  </div>
  <div class="col">
    <a href="#">
      <img src={pic4} alt="Image 4" class="img-fluid" style={{height: "700px", width:"300px"}}></img>
    </a>
  </div>
  <div class="col">
    <a href="#">
      <img src={pic5} alt="Image 5" class="img-fluid" style={{height: "700px", width:"300px"}}></img>
    </a>
    </div>

    </div>
 </div>
                    
            <h3>
                  <div className="homept-active">
                   

                  </div>
                  <button className="homept-btn2" >
                  <Link  to="https://www.google.com/maps/search/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B8%9E%E0%B8%A2%E0%B8%B2%E0%B8%9A%
                  E0%B8%B2%E0%B8%A5%E0%B9%83%E0%B8%81%E0%B8%A5%E0%B9%89%E0%B8%89%E0%B8%B1%E0%B8%99/@18.7950341,98.983141
                  1,14z/data=!3m1!4b1?hl=th"  >โรงพยาบาลที่ใกล้เคียง</Link>
                  
                  <br></br>
                  <Link  style={{ fontSize:'30px'}}to="https://w
                  ww.google.com/maps/search/%E0%B9%82%E0%B8%A3%E0%B8%87%
                  E0%B8%9E%E0%B8%A2%E0%B8%B2%E0%B8%9A%E0%B8%B2%E0%B8%A5%E0%B9%83%
                  E0%B8%81%E0%B8%A5%E0%B9%89%E0%B8%89%E0%B8%B1%E0%B8%99/@18.7950341,98.983
                  1411,14z/data=!3m1!4b1?hl=th"  >Click Me</Link>
                 
                  
                  </button>

             </h3>
        </div>  
        
       
    )
}

export default Homept;