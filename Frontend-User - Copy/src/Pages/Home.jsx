import React, { useContext, useEffect, useState } from "react";

import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

import Hero from "../components/Home/Hero.jsx";
import Slider from "../components/Home/Scroller.jsx";
import HomeFeatures from "../components/Home/HomeFeatures.jsx";
import PopularCategories from "../components/Home/PopularCategories.jsx";
import HomeCTA from "../components/Home/HomeCTA.jsx";
import TopCourses from "../components/Home/TopCourses.jsx";

import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

import "../css/AppAnimation.css";

import { CourseContext } from "../Context/CourseContext.jsx";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { fetchCourses } = useContext(CourseContext);

  const [showLoader, setShowLoader] = useState(true);
  const [pageReady, setPageReady] = useState(false);
  const [pendingToast, setPendingToast] = useState(null);

  useEffect(() => {
    let loaderTimer;

    const loadHomePage = async () => {
      const sessiontoken = sessionStorage.getItem("token");

      if (!sessiontoken) {
        document.body.classList.remove("loading");

        navigate("/login", {
          state: {
            loginerrMessage: "please login first to access our website",
          },
        });

        return;
      }

      try {
        document.body.classList.add("loading");
        window.scrollTo(0, 0);

        if (location.state?.loginMessage) {
          setPendingToast({
            type: "success",
            message: location.state.loginMessage,
          });

          navigate(location.pathname, {
            replace: true,
          });
        }

        await fetchCourses();

        loaderTimer = setTimeout(() => {
          setShowLoader(false);
          setPageReady(true);
          document.body.classList.remove("loading");
        }, 1000);
      } catch (error) {
        console.log(error);

        setShowLoader(false);
        setPageReady(true);
        document.body.classList.remove("loading");
      }
    };

    loadHomePage();

    return () => {
      clearTimeout(loaderTimer);
      document.body.classList.remove("loading");
    };
  }, []);

  useEffect(() => {
    if (!pageReady) return;

    const refreshTimer = setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
      window.dispatchEvent(new Event("scroll"));
    }, 300);

    return () => clearTimeout(refreshTimer);
  }, [pageReady]);

  // Toast will show only after loader is completed
  useEffect(() => {
    if (showLoader || !pendingToast) return;

    const toastTimer = setTimeout(() => {
      toast.dismiss();

      if (pendingToast.type === "success") {
        toast.success(pendingToast.message);
      }

      if (pendingToast.type === "error") {
        toast.error(pendingToast.message);
      }

      setPendingToast(null);
    }, 200);

    return () => clearTimeout(toastTimer);
  }, [showLoader, pendingToast]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        style={{ zIndex: 999999 }}
      />

      {showLoader ? (
        <div className="loader-container">
          <div className="loader">
            <span></span>
          </div>
        </div>
      ) : (
        <div className="home page-animation">
          <Navbar />

          <section className="slider" data-aos="fade-down">
            <Slider />
          </section>

          <section className="hero" data-aos="fade-up">
            <Hero />
          </section>

          <section
            className="popular-category"
            id="popular-categories"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <PopularCategories />
          </section>

          <section
            className="top-course"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            <TopCourses />
          </section>

          <section
            className="features"
            data-aos="zoom-in-up"
            data-aos-delay="200"
          >
            <HomeFeatures />
          </section>

          <section className="cta" data-aos="zoom-in" data-aos-delay="250">
            <HomeCTA />
          </section>

          <Footer />
        </div>
      )}
    </>
  );
};

export default Home;