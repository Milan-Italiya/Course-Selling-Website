import React, { useContext, useEffect } from "react";

import "../../css/PopularCategories.css";

import { FaBookOpen } from "react-icons/fa";

import { CourseContext } from "../../Context/CourseContext";

const PopularCategories = () => {
  const { course, fetchCourses } = useContext(CourseContext);

  useEffect(() => {
    fetchCourses();
  }, []);

  /* REMOVE DUPLICATE CATEGORIES */

  const uniqueCategories = Array.from(
    new Set(course.map((item) => item.category)),
  ).slice(0, 4);

  return (
    <>
      {/* HEADING */}

      <div className="home-section-heading">
        <h2>Popular Categories</h2>

        <p>Explore trending technologies and career-focused courses.</p>
      </div>

      {/* CATEGORY GRID */}

      <div className="category-grid" data-aos="zoom-in">
        {uniqueCategories.map((category, index) => (
          <div
            className="category-card"
            key={index}
            data-aos="zoom-in"
            data-aos-delay={index * 120}
          >
            <FaBookOpen />

            <h3>{category}</h3>
          </div>
        ))}
      </div>
    </>
  );
};

export default PopularCategories;
