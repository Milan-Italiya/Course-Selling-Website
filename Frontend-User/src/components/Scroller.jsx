import React, { useContext, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '../css/Scroller.css'
import { CourseContext } from '../Context/CourseContext';
import { useNavigate } from 'react-router-dom';

// const featuredCourses = [
//   {
//     id: 1,
//     title: "Mastering React",
//     description: "Build powerful web apps with React.js",
//     image: "https://img.freepik.com/free-photo/programming-background-with-person-working-with-codes-computer_23-2150010130.jpg?ga=GA1.1.66037698.1743609014&semt=ais_hybrid&w=740"
//   },
//   {
//     id: 2,
//     title: "Fullstack with Node.js",
//     description: "Backend development made simple",
//     image: "https://img.freepik.com/premium-photo/web-design-text-glowing-neon-word-inscription-digital-blurred-background-web-design-3d-render_507676-5057.jpg?ga=GA1.1.66037698.1743609014&semt=ais_hybrid&w=740"
//   },
//   {
//     id: 3,
//     title: "UI/UX Design Fundamentals",
//     description: "Design user-friendly modern interfaces",
//     image: "https://img.freepik.com/free-vector/gradient-ui-ux-elements-background_23-2149056159.jpg?ga=GA1.1.66037698.1743609014&semt=ais_hybrid&w=740"
//   },
// ];

const Scroller = () => {
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  const {course,fetchCourses} = useContext(CourseContext)

  useEffect(() => {
    fetchCourses();
  }, [])
  
  return (
    <div className="slider-wrapper">
      <Slider {...settings}>
        {course.map(course => (
          <div key={course._id} className="slide">
            <img src={course.image.url} alt={course.title} />
            <div className="slide-content">
              <h2>{course.title}</h2>
              <p>{course.description}</p>
              <button className="course-btn" onClick={() => { navigate(`/courses/${course._id}`) }}>More information</button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Scroller;
