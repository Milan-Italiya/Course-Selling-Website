import React from "react";

import "../../css/HomeCTA.css";

import { FaArrowRight } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const HomeCTA = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="cta-content">
        <h2>Start Your Learning Journey Today</h2>

        <p>
          Join thousands of students learning modern technologies with Learnova.
        </p>

        <button onClick={() => navigate("/courses")}>
          Explore Courses
          <FaArrowRight />
        </button>
      </div>
    </>
  );
};

export default HomeCTA;
