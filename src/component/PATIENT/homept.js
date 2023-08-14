import React from 'react';
import { Link } from 'react-router-dom';
import './homept.css';
import Footer from '../foothead/Footer';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


import Typewriter from "typewriter-effect";
import pic from "./urs-middle.png";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import pic1 from "./1.png"; 
import pic2 from "./2.png";
import pic3 from "./3.png";
import { Carousel } from "./Carousel.jsx";

import carouselData from "./carouselData.json";

function Homept() {
    const cardData = [
        {
          image: pic1,
          title: "Lizard",
          description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica."
        },
        {
          image: pic2,
          title: "Bird",
          description: "Birds are a group of warm-blooded vertebrates constituting the class Aves, characterised by feathers, toothless beaked jaws, the laying of hard-shelled eggs..."
        },
        {
          image: pic3,
          title: "Fish",
          description: "Fish are gill-bearing aquatic craniate animals that lack limbs with digits."
        }
      ];
      


    return (
        <div className="app-container">
        <div className="container">

        <section className="info-section">
            <div className="text-part">
                <div className="superword">
                    <h1>ยินดีต้อนรับเข้าสู่</h1>
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
                <a href='/admin'><button className="start-btn">Let's Get Started</button></a>
            </div> 
            <div className="image-part">
                <img src={pic} />
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
    
    <div className="card-container">
        {cardData.map((card, index) => (
            <div className="card-wrapper" key={index}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image={card.image}
                            alt={card.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {card.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {card.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        ))}
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

        </div>
        
    )
}

export default Homept;
