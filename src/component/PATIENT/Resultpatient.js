import React, { useState } from "react";
import ResultList from "../ResultList";
import ResultDetails from "../ResultDetails";

const Resultpatient = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleBackClick = () => {
    setSelectedProject(null);
  };

  return (
    <div>
      {!selectedProject ? (
        <ResultList onSelect={handleProjectClick} />
      ) : (
        <ResultDetails project={selectedProject} onBack={handleBackClick} />
      )}
    </div>
  );
};

export default Resultpatient;
