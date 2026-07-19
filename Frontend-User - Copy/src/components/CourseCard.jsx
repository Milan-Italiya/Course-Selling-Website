import React, { useEffect } from "react";
import "../css/CourseCard.css";
import { useNavigate } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";

const CourseCard = ({ course = [] }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="course-list">
        {course.length > 0 ? (
          course.map((course, index) => (
            <div
              className="course-card"
              key={course._id || index}
              data-aos="fade-up"
              data-aos-duration="900"
            >
              <img
                src={course.image?.url}
                alt={course.title}
                className="course-image"
              />

              <h3>{course.title}</h3>

              <p>{course.description}</p>

              <button
                type="button"
                className="course-btn"
                onClick={() => navigate(`/courses/${course._id}`)}
              >
                View More
              </button>
            </div>
          ))
        ) : (
          <div
            className="course-error"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            No courses found
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;