import React from 'react';
import './Service.css';
import picmid1 from "./PATIENT/1.png";
import picmid2 from "./PATIENT/2.png";
import picmid3 from "./PATIENT/3.png";

function Service() {
  const services = [
    { name: 'service1', src: picmid1 },
    { name: 'service2', src: picmid2 },
    { name: 'service3', src: picmid3 },
  ];

  return (
    <div className="container">
      <div className="middle-text">
       บริการของเรา
      </div>
      <div className="cards-container">
        {services.map((service, index) => (
          <div key={index} className="card">
            <img src={service.src} alt={service.name} />
            <button className="buy-button">ซื้อบริการ: {service.name}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Service;
