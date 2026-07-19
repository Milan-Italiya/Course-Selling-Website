import React, { useContext, useEffect } from "react";

import "../../css/TopCourses.css";

import { useNavigate } from "react-router-dom";
import { CourseContext } from "../../Context/CourseContext";

const TopCourses = () => {
  const navigate = useNavigate();

  const { topCourses, fetchTopCourses } = useContext(CourseContext);

  useEffect(() => {
    fetchTopCourses();
  }, []);

  return (
    <>
      {/* HEADER */}

      <div className="top-course-header">
        <h2>Top Courses</h2>

        <p>Explore trending and career-focused courses.</p>
      </div>

      {/* COURSES */}

      <div className="top-course-container">
        {topCourses.slice(0, 6).map((item,index) => (
          <div className="top-course-card" key={index} data-aos='fade-up'
  data-aos-delay={index * 100}>
            {/* IMAGE */}

            <div className="top-course-image">
              <img src={item.image.url} alt={item.title} />
            </div>

            {/* CONTENT */}

            <div className="top-course-content">
              {/* TITLE */}

              <h3>{item.title}</h3>

              {/* DESCRIPTION */}

              <p>{item.description?.slice(0, 75)}...</p>

              {/* BUTTON */}

              <button onClick={() => navigate(`/courses/${item._id}`)}>
                View More
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TopCourses;
