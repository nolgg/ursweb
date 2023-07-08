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
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    setSelectedProject(project);
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
    <div className="headmo">
      <div className="font result-container">
        {!showMaxPage ? (
          <div className="h">
            <h2>รายชื่อผู้เข้ารับการตรวจ</h2>
            <br></br>
            <ul>
              <div>
                <p
                  style={{
                    color: "gray",
                    marginRight: "500px",
                    marginBottom: "-50px",
                  }}
                >
                  รายชื่อ
                </p>
              </div>
              <div>
                <p className="d1">วันที่ตรวจ</p>
              </div>
              <br></br>

              {projects.map((project) => (
                <li
                  class="collection-item"
                  key={project.id}
                  className="result-item"
                  onClick={() => handleProjectClick(project)}
                >
                  {project.firstName} {project.lastName}
                  <p
                    class="secondary-content"
                    style={{ textAlign: "right", marginTop: "-5px" }}
                  >
                    {project.timestamp
                      .toDate()
                      .toLocaleString("th-TH", {
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
          <div className="font result-details">
            <button className="back-button" onClick={handleBackClick}>
              Back to List
            </button>
            <div>
              <h2>
                {selectedProject.firstName} {selectedProject.lastName}
              </h2>
              <p>เปอร์เซ็นต์ความเสี่ยงในการเกิดโรคนิ่ว</p>
              {selectedProject.result <= 50 ? (
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
              ) : selectedProject.result >= 70 ? (
                <p
                  className="my-2"
                  style={{
                    color: "red",
                    fontSize: "35px",
                    marginTop: "65px",
                  }}
                >
                  ความเสี่ยงสูง
                </p>
              ) : (
                <p
                  className="my-2"
                  style={{ color: "orange", fontSize: "35px" }}
                >
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
                        style={{ color: "orange", fontSize: "100px" }}
                      >
                        {selectedProject.result.toString().slice(0, 5)}%
                      </p>
                    )}
                  </h3>
                ) : (
                  <div>Loading... Please wait</div>
                )}
              </h3>

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
                      <button
                        className="close-button"
                        onClick={handleImageClose}
                      >
                        X
                      </button>
                      <img
                        className="full-image"
                        src={selectedImage}
                        alt="uploaded"
                      />
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
                {selectedProject.calox1.toString().slice(0, 5)}
              </div>
              <div className="detail-item">
                <strong>WBC of urine :</strong>
                {selectedProject.WBC1.toString().slice(0, 5)}
              </div>
              <div className="detail-item">
                <strong> RBC of urine :</strong>
                {selectedProject.RBC.toString().slice(0, 5)}
              </div>
              <div className="font">
                <label>Comment:</label>
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button className="font" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Result2;
