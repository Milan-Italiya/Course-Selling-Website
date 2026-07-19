import React from "react";

import "../../css/HomeFeatures.css";

import {
  FaLaptopCode,
  FaCertificate,
  FaUsers
} from "react-icons/fa";

const HomeFeatures = () => {

  return (

    <>

      {/* HEADING */}

      <div
        className="home-section-heading"
        data-aos="fade-up"
      >

        <h2>
          Why Choose Learnova ?
        </h2>

        <p>
          Learn modern skills with practical
          experience and industry-focused
          courses.
        </p>

      </div>

      {/* FEATURES GRID */}

      <div className="home-features-grid">

        {/* CARD 1 */}

        <div
          className="home-feature-card"
          data-aos="fade-up"
          data-aos-delay="100"
        >

          <FaLaptopCode />

          <h3>
            Practical Learning
          </h3>

          <p>
            Work on real-world projects and
            implementation-based learning.
          </p>

        </div>

        {/* CARD 2 */}

        <div
          className="home-feature-card"
          data-aos="fade-up"
          data-aos-delay="200"
        >

          <FaCertificate />

          <h3>
            Certification
          </h3>

          <p>
            Earn professional certificates
            after completing courses
            successfully.
          </p>

        </div>

        {/* CARD 3 */}

        <div
          className="home-feature-card"
          data-aos="fade-up"
          data-aos-delay="300"
        >

          <FaUsers />

          <h3>
            Expert Mentors
          </h3>

          <p>
            Learn directly from experienced
            mentors and professionals.
          </p>

        </div>

      </div>

    </>
  );
};

export default HomeFeatures;