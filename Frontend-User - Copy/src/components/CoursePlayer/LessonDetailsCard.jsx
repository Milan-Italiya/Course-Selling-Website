import React from "react";
import { FaCheckCircle, FaClock } from "react-icons/fa";

const LessonDetailsCard = ({
  playerLesson,
  playerAccess,
  playerProgress,
  isYouTubeVideo,
  lessonStatus,
  onMarkComplete,
  onBuyCourse,
}) => {
  return (
    <div className="lesson-details-card">
      <div className="lesson-details-top">
        <div>
          <span className="lesson-mini-label">
            {isYouTubeVideo ? "YouTube Lesson" : "Video Lesson"}
          </span>

          <h2>{playerLesson.title}</h2>
          <p>{playerLesson.description}</p>
        </div>

        <span className="lesson-duration-badge">
          <FaClock />
          {playerLesson.duration}
        </span>
      </div>

      <div className="lesson-status-row">
        <span>
          Access: {playerAccess?.isPreview ? "Free Preview" : "Purchased Lesson"}
        </span>

        <span>Status: {lessonStatus}</span>

        <span>Type: {isYouTubeVideo ? "YouTube" : "Direct Video"}</span>
      </div>

      <div className="player-action-row">
        <button
          type="button"
          className="mark-complete-btn"
          onClick={onMarkComplete}
          disabled={playerProgress?.isCompleted}
        >
          <FaCheckCircle />
          {playerProgress?.isCompleted ? "Lesson Completed" : "Mark as Complete"}
        </button>

        {!playerAccess?.hasPurchasedCourse && (
          <button type="button" className="buy-full-course-btn" onClick={onBuyCourse}>
            Buy Full Course
          </button>
        )}
      </div>
    </div>
  );
};

export default LessonDetailsCard;