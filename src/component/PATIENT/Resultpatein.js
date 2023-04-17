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
      .collection('users')
      .doc(currentUser.uid)
      .onSnapshot((doc) => {
        const userData = doc.data();
        const idCardData = userData.IDcard;
        console.log('IDcard data:', idCardData);

        db.collection('projects')
          .where('IDcard', '==', idCardData) // filter by IDcard data
          .orderBy('timestamp', 'desc')
          .onSnapshot((snapshot) => {
            const projectsData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setProjects(projectsData);
          });
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
            <h3>{selectedProject.firstName}</h3>
            <div className="detail-item">
              <strong>Last Name:</strong> {selectedProject.lastName}
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
              <strong>Gravity:</strong> {selectedProject.gravity}
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
          
            {selectedProject.images && (
              <div className="detail-item">
                <strong>Images:</strong>
                <ul className="image-list">
                  {selectedProject.images.map((imageUrl) => (
                    <li key={imageUrl}>
                      <img className="image-item" src={imageUrl} alt="uploaded" />
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
