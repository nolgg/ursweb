import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase/compat/app";
import "./ResultList.css";
import { AuthContext } from "./Atuh";

const ResultList = ({ onSelect }) => {
  const [projects, setProjects] = useState([]);
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
          setIDcard(String(doc.data().IDcard));
        } else {
          console.log("User not found");
        }
      });

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

  return (
    <div className="font result-container">
      <h2>ประวัติการเข้ารับการตรวจวิเคราะห์ความเสี่ยง</h2>
      <ul>
        <div>
          <p className="header-title">ชื่อ</p>
        </div>
        <div>
          <p className="header-date">วันที่ตรวจ</p>
        </div>
        {projects.map((project) => (
          <li
            key={project.id}
            className="result-item"
            onClick={() => onSelect(project)}
          >
            {project.firstName} {project.lastName}
            <p className="date-text">
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
  );
};

export default ResultList;
