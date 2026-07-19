import React from "react";

import "../../css/CourseDetailHero.css";

import { FaClock, FaStar, FaUserGraduate } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CourseDetailHero = ({ courseDetails }) => {

    const navigate = useNavigate();

    return (
        <>
            <div className="course-hero-left">
                <h1 className="course-detail-title">
                    {courseDetails?.title}
                </h1>
                <p className="course-detail-description">
                    {courseDetails?.description}
                </p>
                {/* META */}
                <div className="course-meta">
                    <span>
                        <FaStar /> 4.8 Rating
                    </span>
                    <span>
                        <FaUserGraduate /> 12k+ Students
                    </span>
                    <span>
                        <FaClock /> 25 Hours
                    </span>
                </div>
                {/* PRICE */}
                <div className="price-section">
                    <h2>
                        ₹ {courseDetails?.price}
                    </h2>
                </div>
                {/* BUTTONS */}
                <div className="course-buttons">
                    <button
                        className="enroll-btn"
                        onClick={() => {
                            navigate(`/buy/${courseDetails._id}`)
                        }}
                    >
                        Enroll Now
                    </button>
                    <button
                        className="back-btn"
                        onClick={() => {
                            navigate(-1)
                        }}
                    >
                        Back
                    </button>
                </div>
            </div>
            {/* RIGHT IMAGE */}
            <div className="course-hero-right">
                <img
                    src={courseDetails.image?.url}
                    alt={courseDetails?.title}
                    className="course-detail-image"
                />
            </div>
        </>
    );
};

export default CourseDetailHero;