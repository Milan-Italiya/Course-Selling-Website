import React from "react";
import "../css/Skeleton/CoursePlayerSkeleton.css";

const CoursePlayerSkeleton = () => {
  return (
    <>
    <div className="course-player-skeleton-page">
      <div className="course-player-skeleton-header">
        <div className="skeleton-back-btn skeleton-shimmer"></div>

        <div className="skeleton-header-content">
          <div className="skeleton-lesson-label skeleton-shimmer"></div>
          <div className="skeleton-title skeleton-shimmer"></div>
          <div className="skeleton-description skeleton-shimmer"></div>
        </div>
      </div>

      <div className="course-player-skeleton-layout">
        <main className="course-player-skeleton-main">
          <div className="skeleton-video-box skeleton-shimmer">
            <div className="skeleton-play-circle skeleton-shimmer"></div>
          </div>

          <div className="skeleton-details-card">
            <div className="skeleton-details-top">
              <div className="skeleton-details-left">
                <div className="skeleton-mini-label skeleton-shimmer"></div>
                <div className="skeleton-detail-title skeleton-shimmer"></div>
                <div className="skeleton-detail-text skeleton-shimmer"></div>
                <div className="skeleton-detail-text short skeleton-shimmer"></div>
              </div>

              <div className="skeleton-duration skeleton-shimmer"></div>
            </div>

            <div className="skeleton-status-row">
              <div className="skeleton-status-pill skeleton-shimmer"></div>
              <div className="skeleton-status-pill skeleton-shimmer"></div>
              <div className="skeleton-status-pill skeleton-shimmer"></div>
            </div>

            <div className="skeleton-action-row">
              <div className="skeleton-action-btn skeleton-shimmer"></div>
              <div className="skeleton-action-btn secondary skeleton-shimmer"></div>
            </div>
          </div>

          <div className="skeleton-notes-card">
            <div className="skeleton-notes-title skeleton-shimmer"></div>
            <div className="skeleton-note-line skeleton-shimmer"></div>
            <div className="skeleton-note-line skeleton-shimmer"></div>
            <div className="skeleton-note-line short skeleton-shimmer"></div>
          </div>
        </main>

        <aside className="course-player-skeleton-sidebar">
          <div className="skeleton-sidebar-title skeleton-shimmer"></div>

          <div className="skeleton-summary-item skeleton-shimmer"></div>
          <div className="skeleton-summary-item skeleton-shimmer"></div>
          <div className="skeleton-summary-item skeleton-shimmer"></div>
          <div className="skeleton-summary-item skeleton-shimmer"></div>
          <div className="skeleton-summary-item skeleton-shimmer"></div>

          <div className="skeleton-help-box">
            <div className="skeleton-help-title skeleton-shimmer"></div>
            <div className="skeleton-help-line skeleton-shimmer"></div>
            <div className="skeleton-help-line skeleton-shimmer"></div>
            <div className="skeleton-help-line short skeleton-shimmer"></div>
          </div>

          <div className="skeleton-sidebar-btn skeleton-shimmer"></div>
        </aside>
      </div>
    </div>
    </>
  );
};

export default CoursePlayerSkeleton;