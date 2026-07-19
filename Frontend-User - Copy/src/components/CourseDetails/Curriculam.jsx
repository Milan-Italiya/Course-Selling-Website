import React, { useContext, useEffect, useMemo } from "react";
import "../../css/Curriculum.css";

import {
  FaPlayCircle,
  FaLock,
  FaClock,
  FaBookOpen,
  FaEye,
} from "react-icons/fa";

import { useNavigate, useParams } from "react-router-dom";
import { CurriculumContext } from "../../Context/CurriculumContext";

const Curriculum = () => {
  const navigate = useNavigate();

  const { courseId, id } = useParams();
  const finalCourseId = courseId || id;

  const { curriculumByCourse, fetchCurriculumByCourse, loading } =
    useContext(CurriculumContext);

  useEffect(() => {
    if (finalCourseId) {
      fetchCurriculumByCourse(finalCourseId);
    }
  }, [finalCourseId]);

  /*
    Supports these response types:

    1. Array:
       curriculumByCourse = [...]

    2. Object:
       curriculumByCourse = {
         success: true,
         curriculum: [...]
       }

    3. Nested object:
       curriculumByCourse = {
         data: {
           curriculum: [...]
         }
       }
  */
  const curriculumList = useMemo(() => {
    const list = Array.isArray(curriculumByCourse)
      ? curriculumByCourse
      : Array.isArray(curriculumByCourse?.curriculum)
        ? curriculumByCourse.curriculum
        : Array.isArray(curriculumByCourse?.data?.curriculum)
          ? curriculumByCourse.data.curriculum
          : [];

    return [...list].sort((a, b) => {
      const firstOrder = a.order ?? 0;
      const secondOrder = b.order ?? 0;

      return firstOrder - secondOrder;
    });
  }, [curriculumByCourse]);

  const totalLessons = curriculumList.length;

  const previewLessons = curriculumList.filter(
    (item) => item.isPreview === true,
  ).length;

  const lockedLessons = totalLessons - previewLessons;

  const handleLessonClick = (lessonId, isPreview) => {
    if (!isPreview) return;
    if (!finalCourseId || !lessonId) return;

    navigate(`/course/${finalCourseId}/lesson/${lessonId}`);
  };

  const handleLessonKeyDown = (event, lessonId, isPreview) => {
    if (!isPreview) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleLessonClick(lessonId, isPreview);
    }
  };

  return (
    <div className="curriculum-section">
      <div className="curriculum-heading">
        <h2>Course Curriculum</h2>

        <p>Learn step-by-step with structured modules and practical lessons.</p>

        <div className="curriculum-stats">
          <span>
            <FaBookOpen />
            {totalLessons} {totalLessons === 1 ? "Lesson" : "Lessons"}
          </span>

          <span>
            <FaEye />
            {previewLessons} {previewLessons === 1 ? "Preview" : "Previews"}
          </span>

          <span>
            <FaLock />
            {lockedLessons} Locked
          </span>
        </div>
      </div>

      <div className="curriculum-container">
        {loading ? (
          <p className="curriculum-loading">Loading Curriculum...</p>
        ) : curriculumList.length > 0 ? (
          curriculumList.map((item, index) => {
            const isPreview = item.isPreview === true;
            const lessonNumber = String(index + 1).padStart(2, "0");

            return (
              <div
                className={`curriculum-card ${isPreview ? "preview-card" : "locked-card"
                  }`}
                key={item._id || index}
                onClick={() => handleLessonClick(item._id, isPreview)}
                onKeyDown={(event) =>
                  handleLessonKeyDown(event, item._id, isPreview)
                }
                role={isPreview ? "button" : "article"}
                tabIndex={isPreview ? 0 : -1}
                aria-disabled={!isPreview}
              >
                <div className="curriculum-left">
                  <div
                    className={`curriculum-icon ${isPreview ? "preview-icon-box" : "locked-icon-box"
                      }`}
                  >
                    {isPreview ? <FaPlayCircle /> : <FaLock />}
                  </div>

                  <div className="curriculum-content">
                    <div className="lesson-label">Lesson {index + 1}</div>

                    <div className="curriculum-title-row">
                      <span className="lesson-number">{lessonNumber}</span>

                      <h3>{item.title || "Untitled Lesson"}</h3>

                      {isPreview ? (
                        <span className="preview-badge">Free Preview</span>
                      ) : (
                        <span className="locked-badge">Locked</span>
                      )}
                    </div>

                    <p>
                      {item.description ||
                        "Lesson details will be available soon."}
                    </p>
                  </div>
                </div>

                <div className="curriculum-right">
                  <span className="curriculum-duration">
                    <FaClock />
                    {item.duration || "Duration not set"}
                  </span>

                  {isPreview ? (
                    <FaPlayCircle className="preview-status-icon" />
                  ) : (
                    <FaLock className="lock-status-icon" />
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="curriculum-error">No Curriculum Available</p>
        )}
      </div>
    </div>
  );
};

export default Curriculum;