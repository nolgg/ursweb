import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section about">
                    <h1 className="logo-text">เกี่ยวกับ URS</h1>
                    <p>
                        URS เป็นโครงงานที่เราสร้างขึ้นมาภายใต้ปัญหาที่เราได้พบเจอกับตนเองและคนใกล้ตัว เราได้สร้างโครงงานนี้ขึ้นมาโดยมีเป้าเพื่อช่วยเหลือคนในชุมชนให้สามารถตรวจโรคแบบทั่วถึงโดยไม่ลำบากผู้ตรวจและผู้ป่วย
                    </p>
                </div>

                <div className="footer-section links">
                    <h2>ช่องทางการติดต่อ</h2>
                    <ul>
                        <li><h7>เบอร์โทร:  062-334-6595</h7></li>
                        <li><h7>Email: URS-company@gmail.com</h7></li>
                        <li><h7>สถานศึกษา: <a href='https://www.prc.ac.th/'>โรงเรียนปริ้นส์รอยแยล</a></h7></li>
                        <li><h7>Instargram: </h7><a href="#">@urs_community</a></li>
                    </ul>
                </div>

                <div className="footer-section contact-form">
                    <h2>ติดต่อเราที่นี่</h2>
                    <form>
                        <input type="email" placeholder="Email ของคุณ...." className="footer-input" />
                        <textarea rows="4" placeholder="ข้อความของคุณ...." className="footer-input"></textarea>
                        <button type="submit" className="footer-btn">ส่ง</button>
                    </form>
                </div>
            </div>

            <div className="footer-bottom">
               " เพื่อสังคมที่มั่นคงและยังยืน "
            </div>
        </footer>
    );
}

export default Footer;
