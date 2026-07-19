import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const CoursePlayerHeader = ({ playerLesson, onBack }) => {
  return (
    <div className="course-player-header">
      <button type="button" className="course-player-back-btn" onClick={onBack}>
        <FaArrowLeft />
        Back
      </button>

      <div className="course-player-heading-content">
        <span>Lesson {playerLesson.order || ""}</span>
        <h1>{playerLesson.title}</h1>
        <p>{playerLesson.description}</p>
      </div>
    </div>
  );
};

export default CoursePlayerHeader;