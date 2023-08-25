import React from "react";
import './ResultDetails.css';

const ResultDetails = ({ project, onBack }) => {
    const Commentdoc =
        project &&
        project.comments &&
        project.comments.length > 0
            ? project.comments[project.comments.length - 1].comment
            : "No doctor comment";

    return (
        <div className="font details-container">
            <button className="back-button" onClick={onBack}>
                Back to List
            </button>

            {project && (
                <>
                    <h2>{project.firstName} {project.lastName}</h2>
                    <p>IDcard: {project.IDcard}</p>
                    <p>RBC: {project.RBC}</p>
                    <p>Sq: {project.Sq}</p>
                    <p>WBC: {project.WBC}</p>
                    <p>WBC1: {project.WBC1}</p>
                    <p>Age: {project.age}</p>
                    <p>Result: {project.result}</p>
                    <p>Date of Check: {project.timestamp}</p>
                    <p>Doctor's Comment: {Commentdoc}</p>
                    <h3>Images:</h3>
                    <div className="image-container">
                        {project.imageUrls && project.imageUrls.map((url, index) => (
                            <img key={index} src={url} alt={`Detection Image ${index}`} className="detection-image"/>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ResultDetails;
