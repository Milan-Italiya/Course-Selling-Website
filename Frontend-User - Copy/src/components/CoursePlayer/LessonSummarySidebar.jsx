import React from "react";

const LessonSummarySidebar = ({
  playerLesson,
  playerAccess,
  playerProgress,
  isYouTubeVideo,
  onCourseDetails,
}) => {
  return (
    <aside className="course-player-sidebar">
      <h3>Lesson Summary</h3>

      <div className="summary-item">
        <span>Duration</span>
        <strong>{playerLesson.duration || "Not set"}</strong>
      </div>

      <div className="summary-item">
        <span>Preview</span>
        <strong>{playerAccess?.isPreview ? "Yes" : "No"}</strong>
      </div>

      <div className="summary-item">
        <span>Purchased</span>
        <strong>{playerAccess?.hasPurchasedCourse ? "Yes" : "No"}</strong>
      </div>

      <div className="summary-item">
        <span>Completed</span>
        <strong>{playerProgress?.isCompleted ? "Yes" : "No"}</strong>
      </div>

      <div className="summary-item">
        <span>Video Type</span>
        <strong>{isYouTubeVideo ? "YouTube" : "MP4"}</strong>
      </div>

      <div className="player-help-box">
        <h4>Shortcuts</h4>
        <p>Space: Play/Pause</p>
        <p>← / →: Skip 10s</p>
        <p>M: Mute</p>
        <p>F: Fullscreen</p>
      </div>

      <button type="button" className="course-details-btn" onClick={onCourseDetails}>
        Course Details
      </button>
    </aside>
  );
};

export default LessonSummarySidebar;