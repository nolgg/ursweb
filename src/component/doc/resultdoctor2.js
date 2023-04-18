import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "./Result2.css";
import { AuthContext } from "../Atuh";

const Result2 = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showMaxPage, setShowMaxPage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [comment, setComment] = useState("");
  const { currentUser } = useContext(AuthContext);

  const handleSubmit = () => {
    if (comment.trim() !== "") {
      const db = firebase.firestore();
      db.collection("projects")
        .doc(selectedProject.id)
        .update({
            comments: firebase.firestore.FieldValue.arrayUnion({
            user: currentUser.email,
            comment: comment.trim(),
            commenttimestamp: firebase.firestore.Timestamp.now(),
          }),
        })
        .then(() => {
          console.log("Comment added successfully.");
          setComment("");
        })
        .catch((error) => {
          console.error("Error adding comment: ", error);
        });
    }
  };

  useEffect(() => {
    if (currentUser) {
      const db = firebase.firestore();
      console.log("Current user id:", currentUser.uid);
      const unsubscribe = db
        .collection("projects")
        .orderBy("timestamp", "desc")
        .where("userId", "==", currentUser.uid) // filter by current user id
        .onSnapshot((snapshot) => {
          const projectsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setProjects(projectsData);
        });
      return unsubscribe;
    }
  }, [currentUser]);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setShowMaxPage(true);
  };

  const handleBackClick = () => {
    setSelectedProject(null);
    setShowMaxPage(false);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleImageClose = () => {
    setSelectedImage(null);
  };
  
  

  return (
    <div className="result-container">
    {!showMaxPage ? (
      <div style={{ backgroundcolor: "#ffffff", borderradius: '5px', padding: "20px", width:'75%' }}>
        <h2>รายชื่อผู้เข้ารับการตรวจ</h2>
        <br></br>
        <ul>
          <div>
            <p style={{ color:'gray', marginRight:'1000px', marginBottom:"-50px" }}>รายชื่อ</p>
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
        
      ) : (
        <div className="result-details">
          <button className="back-button" onClick={handleBackClick}>
            Back to List
          </button>
          <div>
            <h2>{selectedProject.firstName}  {selectedProject.lastName}</h2>

            <h3>
              {selectedProject.Result} %
            </h3>

        {/* <h4>{project.result} %</h4> */}

        <div>
              {selectedProject.imageUrls && (
                <div className="detail-item">
                  <strong>Images:</strong>
                  <div className="image-list">
                    {selectedProject.imageUrls.map((imageUrl) => (
                      <img
                        key={imageUrl.url}
                        className="image-item"
                        src={imageUrl}
                        alt="uploaded"
                        onClick={() => handleImageClick(imageUrl)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {selectedImage && (
                <div className="full-image-container">
                  <div className="full-image-wrapper">
                    <button className="close-button" onClick={handleImageClose}>
                      X
                    </button>
                    <img className="full-image" src={selectedImage} alt="uploaded" />
                  </div>
                </div>
              )}
            </div>

           
            
            <div className="detail-item">
              <strong>Age:</strong> {selectedProject.age}
            </div>
            <div className="detail-item">
              <strong>WBC:</strong> {selectedProject.WBC}
            </div>
            <div className="detail-item">
              <strong>Blood:</strong> {selectedProject.blood}
            </div>
            <div className="detail-item">
              <strong>Specificgravity :</strong> {selectedProject.gravity}
            </div>
            <div className="detail-item">
              <strong>pH:</strong> {selectedProject.ph}
            </div>
            <div className="detail-item">
              <strong>Glucose:</strong> {selectedProject.glu}
            </div>
            <div className="detail-item">
              <strong>Ketones:</strong> {selectedProject.ketone}
            </div>
            <div className="detail-item">
              <strong>Oxalate of urine :</strong>
              {selectedProject.calox1}
            </div>
            <div className="detail-item">
              <strong>WBC of urine :</strong>
              {selectedProject.WBC1}
            </div>
            <div className="detail-item">
              <strong> RBC of urine :</strong>
              {selectedProject.RBC}
            </div>
            <div>
       <label>Comment:</label>
  <input
    type="text"
    value={comment}
    onChange={(e) => setComment(e.target.value)}
  />
  <button onClick={handleSubmit}>Submit</button>
</div>
            
          
           
          </div>
        </div>
      )}
    </div>
  );
};

export default Result2;
