import React from "react";

import "../../css/CourseOverview.css";

import {
  FaCheckCircle,
  FaPlayCircle,
  FaInfinity,
  FaMobileAlt,
} from "react-icons/fa";

const CourseOverview = ({ courseDetails }) => {
  return (
    <section className="course-overview-section">

      {/* LEFT SIDE */}

      <div className="course-overview-left">

        <div className="overview-card">

          <h2>Course Overview</h2>

          <p>
            {courseDetails?.description}
          </p>

        </div>

        {/* WHAT YOU WILL LEARN */}

        <div className="overview-card">

          <h2>What You Will Learn</h2>

          <div className="learning-grid">

            <div className="learning-item">
              <FaCheckCircle />
              <span>Build real-world projects</span>
            </div>

            <div className="learning-item">
              <FaCheckCircle />
              <span>Understand core concepts deeply</span>
            </div>

            <div className="learning-item">
              <FaCheckCircle />
              <span>Learn industry best practices</span>
            </div>

            <div className="learning-item">
              <FaCheckCircle />
              <span>Improve practical coding skills</span>
            </div>

            <div className="learning-item">
              <FaCheckCircle />
              <span>Create portfolio-ready applications</span>
            </div>

            <div className="learning-item">
              <FaCheckCircle />
              <span>Prepare for interviews & jobs</span>
            </div>

          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="course-overview-right">

        <div className="course-info-card">

          <h3>Course Includes</h3>

          <div className="info-item">
            <FaPlayCircle />
            <span>25+ Hours Video Content</span>
          </div>

          <div className="info-item">
            <FaInfinity />
            <span>Lifetime Access</span>
          </div>

          <div className="info-item">
            <FaMobileAlt />
            <span>Access on Mobile & Desktop</span>
          </div>

          <button className="overview-enroll-btn">
            Start Learning
          </button>

        </div>

      </div>

    </section>
  );
};

export default CourseOverview;