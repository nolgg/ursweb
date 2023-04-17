import React, { useState, useEffect, useContext } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import './Result2.css';
import { AuthContext } from '../Atuh';

const Result2 = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showMaxPage, setShowMaxPage] = useState(false);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      const db = firebase.firestore();
      console.log('Current user id:', currentUser.uid);
      const unsubscribe = db
        .collection('projects')
        .orderBy('timestamp', 'desc')
        .where('userId', '==', currentUser.uid) // filter by current user id
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

  

  return (
    <div className="result-container">
      {!showMaxPage ? (
        <div className="result-list">
          <h2>Results</h2>
          <ul>
            {projects.map((project) => (
              <li key={project.id} className="result-item" onClick={() => handleProjectClick(project)}>
                {project.firstName}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="result-details">
          <button className="back-button" onClick={handleBackClick}>Back to List</button>
          <div>
            <h3>{selectedProject.firstName}  {selectedProject.lastName}</h3>
            {/* <h4>{project.result} %</h4> */}
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
              <strong>Oxalate of urine :</strong>{selectedProject.calox1}
            </div>
            <div className="detail-item">
              <strong>WBC of urine :</strong>{selectedProject.WBC1}
            </div>
            <div className="detail-item">
              <strong> RBC of urine :</strong>{selectedProject.RBC}
            </div>
        {selectedProject.images && (
       <div className="detail-item">
      <strong>Images:</strong>
    <ul className="image-list">
      {selectedProject.images.map((imageUrl) => (
        <li key={imageUrl}>
          <img
            className="image-item"
            src={imageUrl} // Update this line to use imageUrls.url instead of imageUrls
            alt="uploaded"
            onError={(e) => console.log('Image not found', e)}
          />
        </li>
      ))}
    </ul>
  </div>
)}

          </div>
        </div>
      )}
    </div>
  );
};

export default Result2;
