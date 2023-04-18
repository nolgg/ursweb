import React, { useState, useEffect, useContext } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import './Resultpatein.css';
import { AuthContext, useAuth } from '../Atuh';

const Resultpatient = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showMaxPage, setShowMaxPage] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [IDcard, setIDcard] = useState('');
  
 
  useEffect(() => {
    if (!currentUser) {
      return;
    }
  
    const db = firebase.firestore();
    const userId = currentUser.uid;
    db.collection('users').doc(userId).get()
      .then((doc) => {
        if (doc.exists) {
          console.log(doc.data());
          setIDcard(String(doc.data().IDcard));
        } else {
          console.log('User not found');
        }
      });
      
      console.log("IDCard:",IDcard)

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

 

  return (
    <div className="result-container">
      {!showMaxPage ? (
        <div style={{ backgroundcolor: "#ffffff", borderradius: '5px', padding: "23px", width:'75%' }}>
          <h2>ประวัติการเข้ารับการตรวจวิเคราะห์ความเสี่ยง</h2>
          <ul>
         < div>
            <p style={{ color:'gray', marginRight:'1000px', marginBottom:"-50px" }}>ชื่อ</p>
          </div>
          <div>
            <p style={{ color:'gray', textAlign:"Right", width:"930px" }}>วันที่ตรวจ</p>
          </div>
            {projects.map((project) => (
              <li key={project.id} className="result-item" onClick={() => handleProjectClick(project)}>
                {project.firstName} {project.lastName}
                <p style={{textAlign:"right", marginTop:"-27px"}}>{project.timestamp.toDate().toLocaleString("th-TH", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p> 
              </li>
            ))}
          </ul>
        </div>
      )  : (
        <div className="result-details">
          <button className="back-button" onClick={handleBackClick}>
            Back to List
          </button>
          <div>


          {selectedProject.Result <= 50 ? (

              <p
              clasName="my-2"
              style={{
                color: "green",
                fontSize: "35px",
                marginTop: "65px",
              }}
              >
              อยู่ในเกณฑ์มาตราฐาน
              </p>

            
          ):(


              selectedProject.Result >= 70 ? (
                <p
                clasName="my-2"
                style={{
                  color: "green",
                  fontSize: "35px",
                  marginTop: "65px",
                }}
                >
                อยู่ในเกณฑ์มาตราฐาน
                </p>


              ):(

                
                <p
                clasName="my-2"
                style={{ color: "orange", fontSize: "35px" }}
              >
                มีความเสี่ยงต่ำ{" "}
              </p>
            
              )



          )} 
                  
                   
                   
                 
            <h3>
              {selectedProject.Result} %
            </h3>

            
        
            
          </div>
        </div>
          
      )}
    </div>
  );
};

export default Resultpatient;
