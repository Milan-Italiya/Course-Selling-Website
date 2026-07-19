import React from "react";
import { FaBookOpen } from "react-icons/fa";

const LessonNotesCard = ({ content }) => {
  return (
    <div className="lesson-content-card">
      <h3>
        <FaBookOpen />
        Lesson Notes
      </h3>

      <p>{content || "No notes are added for this lesson yet."}</p>
    </div>
  );
};

export default LessonNotesCard;