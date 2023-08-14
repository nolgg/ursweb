import React from 'react';
import './Aboutus.css';
import aboutImage from "./PATIENT/1.png"; 
import teamImage1 from "./PATIENT/2.png"; 
import teamImage2 from "./PATIENT/3.png"; 

function AboutUs() {
    const teamMembers = [
        { name: "Member 1", image: teamImage1 },
        { name: "Member 2", image: teamImage2 },
        // ... add the other team members similarly
    ];

    return (
        <div className="aboutUs-container">

            <section className="aboutUs-mission">
                <div className="aboutUs-content">
                    <h2>เกี่ยวกับเรา</h2>
                    <p>พวกเรา [URS], we strive to provide...</p>
                </div>
                <div className="aboutUs-image-wrapper">
                    <img src={aboutImage} alt="About Us" />
                </div>
            </section>

            <section className="aboutUs-history">
                <h2>Our History</h2>
                <p>Established in [year], [Company Name] has grown...</p>
            </section>

            <section className="aboutUs-team">
                <h2>Meet the Team</h2>
                <div className="aboutUs-team-cards">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="aboutUs-card">
                            <img src={member.image} alt={member.name} />
                            <p>{member.name}</p>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}

export default AboutUs;
