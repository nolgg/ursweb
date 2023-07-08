import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "./Resultpatein.css";
import { AuthContext, useAuth } from "../Atuh";
import เสี่ยงต่ำ from "./imges/เสี่ยงต่ำ.png";
import เสี่ยงสูง from "./imges/เสี่ยงสูง.png";
import non from "./imges/ไม่มีความเสี่ยง.png";
import { Link } from "react-router-dom";
import pic1 from "./86.png";
import pic2 from "./87.png";

const Resultpatient = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showMaxPage, setShowMaxPage] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [IDcard, setIDcard] = useState("");

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const db = firebase.firestore();
    const userId = currentUser.uid;
    db.collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log(doc.data());
          setIDcard(String(doc.data().IDcard));
        } else {
          console.log("User not found");
        }
      });

    console.log("IDCard:", IDcard);

    const unsubscribe = db
      .collection("projects")
      .orderBy("timestamp", "desc")
      .where("IDcard", "==", parseInt(IDcard))
      .onSnapshot((snapshot) => {
        const projectsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(projectsData);
      });
    return unsubscribe;
  }, [currentUser, IDcard]);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setShowMaxPage(true);
  };

  const handleBackClick = () => {
    setSelectedProject(null);
    setShowMaxPage(false);
  };

  const Commentdoc =
    selectedProject &&
    selectedProject.comments &&
    selectedProject.comments.length > 0
      ? selectedProject.comments[selectedProject.comments.length - 1].comment
      : "No doctor comment";

  

  return (
    <div className="font result-container">
      {!showMaxPage ? (
        <div className="result-list">
          <h2>ประวัติการเข้ารับการตรวจวิเคราะห์ความเสี่ยง</h2>
          <ul>
            <div>
              <p
                style={{
                  color: "gray",
                  marginRight: "1000px",
                  marginBottom: "-50px",
                }}
              >
                ชื่อ
              </p>
            </div>
            <div>
              <p className="d1">วันที่ตรวจ</p>
            </div>
            {projects.map((project) => (
              <li
                key={project.id}
                className="result-item"
                onClick={() => handleProjectClick(project)}
              >
                {project.firstName} {project.lastName}
                <p style={{ textAlign: "right", marginTop: "-27px" }}>
                  {project.timestamp.toDate().toLocaleString("th-TH", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="" style={{marginLeft:"0px"}}>
          <div className="font5">
            <button className="font back-button" onClick={handleBackClick}>
              Back to List
            </button>
            <h1 className="font4" >ผลการตรวจวิเคราะห์ความเสี่ยง</h1>
            <p className="font3">เปอร์เซ็นต์ความเสี่ยงในการเกิดโรคนิ่ว</p>
            {selectedProject.result <= 50 ? (
              <p
                className="my-2"
                style={{
                  color: "green",
                  fontSize: "35px",
                  marginTop: "65px", }}>

                อยู่ในเกณฑ์มาตราฐาน

              </p>
            ) : selectedProject.result >= 70 ? (
              <p
                className="my-2"
                style={{
                  color: "green",
                  fontSize: "35px",
                  marginTop: "65px",
                }}
              >
                อยู่ในเกณฑ์มาตราฐาน
              </p>
            ) : (
              <p className="my-2" style={{ color: "orange", fontSize: "35px" }}>
                มีความเสี่ยงต่ำ{" "}
              </p>
            )}
            <h3>
              {" "}
              {selectedProject.result !== undefined ? (
                <h3>
                  {selectedProject.result <= 50 ? (
                    <p
                      className="my-2"
                      style={{
                        color: "green",
                        fontSize: "100px",
                        marginTop: "65px",
                      }}
                    >
                      {selectedProject.result.toString().slice(0, 5)}%
                    </p>
                  ) : selectedProject.result >= 70 ? (
                    <p
                      className="my-2"
                      style={{
                        color: "red",
                        fontSize: "100px",
                        marginTop: "65px",
                      }}
                    >
                      {selectedProject.result.toString().slice(0, 5)}%
                    </p>
                  ) : (
                    <p
                      className="my-2"
                      style={{ color: "orange", fontSize: "100px", paddingLeft:"20vh" }}
                    >
                      {selectedProject.calox1.toString().slice(0, 2)}%
                    </p>
                  )}
                </h3>
              ) : (
                <div>Loading... Please wait</div>
              )}
            </h3>
                <div className="picture">
            {selectedProject.result <= 50 ? (
              <img src={non} />
            ) : selectedProject.result >= 70 ? (
              <img src={เสี่ยงสูง} />
            ) : (
              <img src={เสี่ยงต่ำ} />
            )}
            </div>


            <div className="ppconfix">
            

              
                <td style={{ fontSize: "20px", color: "#1776CF" , textAlign:"center", width:"1000px"}} className="my-3">
                  ผลการตรวจประเมิน <br></br>
                  พบผลึกแคลเซียมที่มีผลต่อ <br></br>
                  การเกิดโรคนิ่วทั้งหมด<br></br>
                  จำนวน  {selectedProject.calox1.toString().slice(0, 2)} ผลึก
                </td>
           

              <br></br>

              <h2 style={{ fontSize: "40px", color: "#1776CF" }}>
                คำแนะนำจากแพทย์ :
              </h2>
              <p class="flow-text">{Commentdoc}</p>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
            </div>
          


          </div>
          <table
            className="font6"
          >
            <td>
              <img src={pic1} alt="Image 1"></img>
            </td>
            <td>
              <img src={pic2} alt="Image 2"></img>
            </td>
          </table>
          
          <br></br>
          <br></br>
          <br></br>
          <h3 style={{ textAlign: "center"}} >
            <button class="font resultpt-btn2">
              <Link to="https://www.google.com/maps/search/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B8%9E%E0%B8%A2%E0%B8%B2%E0%B8%9A%E0%B8%B2%E0%B8%A5%E0%B9%83%E0%B8%81%E0%B8%A5%E0%B9%89%E0%B8%89%E0%B8%B1%E0%B8%99/@18.7950202,98.9306103,12z/data=!3m1!4b1?hl=th">
                โรงพยาบาลที่ใกล้เคียง
              </Link>
              <br></br>
              <Link
                style={{ fontSize: "3vh" }}
                to="https://www.google.com/maps/search/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B8%9E%E0%B8%A2%E0%B8%B2%E0%B8%9A%E0%B8%B2%E0%B8%A5%E0%B9%83%E0%B8%81%E0%B8%A5%E0%B9%89%E0%B8%89%E0%B8%B1%E0%B8%99/@18.7950202,98.9306103,12z/data=!3m1!4b1?hl=th"
              >
                Click Me
              </Link>
            </button>
          </h3>
          </div>
      )}
    </div>
  );
};

export default Resultpatient;
