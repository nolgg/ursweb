import React from 'react';
import { Link } from 'react-router-dom';
import './homept.css';
import Footer from '../foothead/Footer';

import Typewriter from "typewriter-effect";
import pic from "./urs-middle.png"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import pic1 from "./1.png"; 
import pic2 from "./2.png";
import pic3 from "./3.png";
import { Carousel } from "./Carousel.jsx";

import carouselData from "./carouselData.json";


function Homept() {
    
    return (
        <div className="container">

        <section className="info-section">
       <div className="text-part">
        <div className="superword"><h1>ยินดีต้อนรับเข้าสู่</h1>
        <h1>
        <Typewriter 
 
        onInit={(typewriter) => {
         typewriter
         .typeString("อนาคตที่ดีของชุมชน")
         .pauseFor(1000)
         .deleteAll()
         .typeString("อนาคตที่ดีของทุกคน")
         .pauseFor(1000)
         .deleteAll()
         .typeString("URS")
         .start();
       }}
       />
       </h1>
       </div>
        <p>ระบบตรวจสอบโรคนิ่วและอื่นๆด้วยปัญญาประดิษฐ์ที่ราคาถูกและเป็นมิตรต่อคนไทย </p>
        <p>โดยเราเป็นองค์กรพันธกิจเพื่อสังคมที่ดีกว่าเดิม โดยเราเสนอทางที่ดีกว่าในการตรวจโรคผ่านปัสสาวะ </p>
        <p>ซึ่งในปัจจุบันโรงพยาบาลส่วนตำบลไม่สามารถตรวจโรคผ่านทางปัสสาวะและ... </p>
        <a href='/admin'><button className="start-btn">Let's Get Started</button></a>
        
        </div> 
         <div className="image-part">
        <img src= {pic} />
        </div>
        </section> 

        <section className="hero-section">
                <h1>เราทำงานอย่างไร?</h1>
                <Carousel data={carouselData.picall1} />
                <Link to="/Resultpatient" className="main-btn">Explore Now</Link>
          </section>
          

          <section className="symptoms-section">
    <h2>ปัญหาที่เราเล็งเห็น</h2>
    <p>นี่คือปัญหาที่พบเจอได้จากระบบในปัจจุบันและวิธีแก้ไขปัญหาของเรา</p>
    
    <div className="symptoms-grid">
        <div className="symptom-card">
            <div className="image-placeholder"><img src={pic}></img></div>
            <p>Symptom 1 description</p>
        </div>
        <div className="symptom-card">
            <div className="image-placeholder"></div>
            <p>Symptom 2 description</p>
        </div>
        <div className="symptom-card">
            <div className="image-placeholder"></div>
            <p>Symptom 3 description</p>
        </div>
    </div>
        </section>


            

            <section className="advice-section" id="advice-section">
                <h2>Immediate Advice</h2>
                <div className="action-call"> 
                    <Link to="https://www.google.com/maps/search/..." className="advice-btn">Find Nearby Hospitals</Link>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Homept;
