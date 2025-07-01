import React, { useState, useEffect, useContext } from 'react';
import '../css/About.css'; // Import your CSS file

// You might still import testimonial images if they are static assets
// import testimonialImage1 from '../assets/cloud.jpg';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { TeamContext } from '../Context/TeamContext';

const About = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { teams, fetchTeamMembers } = useContext(TeamContext)

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        fetchTeamMembers()
      } catch (err) {
        console.error("Failed to fetch team members:", err);
        setError("Failed to load team members. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <>
      <Navbar />
      <section className="about-section">
        <div className="about-container">
          <h1 className="about-title">About Us</h1>
          <p className="about-intro">
            Welcome to Learnova! We are passionate about empowering
            individuals to achieve their learning goals through high-quality, accessible,
            and engaging online education.
          </p>

          <div className="about-segment mission">
            <h2>Our Mission</h2>
            <p>
              Our mission is to democratize education by providing a platform where anyone,
              anywhere, can learn new skills, advance their careers, and pursue their passions.
              We believe that continuous learning is the key to personal and professional growth
              in today's rapidly evolving world.
            </p>
            <ul>
              <li><i className="fas fa-check-circle"></i> High-Quality Content from Experts</li>
              <li><i className="fas fa-check-circle"></i> Flexible Learning Paths</li>
              <li><i className="fas fa-check-circle"></i> Community Support</li>
              <li><i className="fas fa-check-circle"></i> Affordable and Accessible Education</li>
            </ul>
          </div>

          <div className="about-segment values">
            <h2>Our Core Values</h2>
            <div className="values-grid">
              <div className="value-item">
                <i className="fas fa-lightbulb"></i>
                <h3>Innovation</h3>
                <p>Constantly seeking new ways to improve the learning experience and course delivery.</p>
              </div>
              <div className="value-item">
                <i className="fas fa-users"></i>
                <h3>Community</h3>
                <p>Fostering a supportive and interactive environment for learners and instructors.</p>
              </div>
              <div className="value-item">
                <i className="fas fa-medal"></i>
                <h3>Excellence</h3>
                <p>Committed to delivering top-tier educational content and user support.</p>
              </div>
              <div className="value-item">
                <i className="fas fa-handshake"></i>
                <h3>Integrity</h3>
                <p>Operating with transparency, honesty, and ethical practices in all our endeavors.</p>
              </div>
            </div>
          </div>

          <div className="about-segment team-section">
            <h2>Meet Our Team</h2>
            <p className="team-intro">
              Behind Learnova is a dedicated team of educators, technologists,
              and customer support specialists committed to your success.
            </p>
            {loading && <p className="loading-message">Loading team members...</p>}
            {error && <p className="error-message">{error}</p>}
            {!loading && !error && teams.length === 0 && (
              <p className="no-data-message">No team members to display at the moment.</p>
            )}
            {!loading && !error && teams.length > 0 && (
              <div className="team-members">
                {teams.map((member) => (
                  <div className="team-member-card" key={member._id}>
                    <img src={member.image.url} alt={member.name} />
                    <h3>{member.name}</h3>
                    <p className="role">{member.role}</p>
                    <p className="bio">{member.bio}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="about-segment history">
            <h2>Our Journey</h2>
            <p>
              Founded in 2001, Learnova started with a simple idea:
              to make expert knowledge accessible to everyone, regardless of their location
              or background. From humble beginnings, we've grown into a thriving community
              of learners and instructors worldwide, continually expanding our course catalog
              and refining our learning technology.
            </p>
            <p>
              We are proud of the thousands of students who have transformed their lives
              and careers through our platform, and we look forward to helping many more.
            </p>
          </div>

          {/* <div className="about-segment testimonials">
            <h2>What Our Students Say</h2>
            <div className="testimonial-cards">
              <div className="testimonial-card">
                <img src={testimonialImage1} alt="Student Name" className="testimonial-img" />
                <p className="testimonial-text">
                  "[Your Course Platform Name] has been a game-changer for my career. The courses are
                  incredibly well-structured, and the instructors are truly experts in their fields.
                  Highly recommend!"
                </p>
                <p className="testimonial-author">- Sarah L., Web Developer</p>
              </div>
              <div className="testimonial-card">
                <img src={testimonialImage1} alt="Student Name" className="testimonial-img" /> 
                <p className="testimonial-text">
                  "I was able to learn a new skill from scratch thanks to the clear lessons and practical
                  exercises. The community forum was also a great place to get help."
                </p>
                <p className="testimonial-author">- Mark R., Aspiring Data Scientist</p>
              </div>
            </div>
          </div> */}

          <div className="about-segment call-to-action">
            <h2>Ready to Start Your Learning Journey?</h2>
            <p>
              Explore our diverse range of courses and take the first step towards achieving
              your educational and career aspirations.
            </p>
            <a href="/courses" className="btn btn-primary">Browse Courses</a>
            <a href="/contact" className="btn btn-secondary">Contact Us</a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;