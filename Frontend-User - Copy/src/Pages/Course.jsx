import React, { useContext, useEffect, useState } from "react";
import "../css/Course.css";
import "../css/AppAnimation.css";

import CourseCard from "../components/CourseCard.jsx";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { CourseContext } from "../Context/CourseContext";
import { useNavigate } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";

const Course = () => {
  const { course, fetchCourses, fetchCoursesBySearch } =
    useContext(CourseContext);

  const [showLoader, setShowLoader] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-in-out",
      once: true,
      offset: 80,
    });
  }, []);

  useEffect(() => {
    document.body.classList.add("loading");

    const loadCourses = async () => {
      const token = sessionStorage.getItem("token");

      if (!token) {
        document.body.classList.remove("loading");

        navigate("/login", {
          state: {
            loginerrMessage: "please login first to access our website",
          },
        });

        return;
      }

      try {
        window.scrollTo(0, 0);

        await fetchCourses();

        setTimeout(() => {
          setShowLoader(false);
          document.body.classList.remove("loading");
        }, 1000);
      } catch (error) {
        console.log(error);

        setShowLoader(false);
        document.body.classList.remove("loading");
      }
    };

    loadCourses();

    return () => {
      document.body.classList.remove("loading");
    };
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [course]);

  if (showLoader) {
    return (
      <div className="loader-container">
        <div className="loader">
          <span></span>
        </div>
      </div>
    );
  }

  return (
    <div className="course-page page-animation">
      <Navbar />

      <form>
        <div className="course-container">
          <h2
            className="course-heading"
            data-aos="fade-down"
            data-aos-delay="100"
          >
            Our Courses
          </h2>

          <div
            className="search-container"
            data-aos="zoom-in"
            data-aos-delay="250"
          >
            <i className="fas fa-search"></i>

            <input
              type="text"
              name="searchbox"
              id="searchbox"
              placeholder="Search Courses..."
              onChange={(e) => fetchCoursesBySearch(e.target.value)}
            />
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="400"
            data-aos-duration="1000"
          >
            <CourseCard course={course} />
          </div>
        </div>
      </form>

      <Footer />
    </div>
  );
};

export default Course;