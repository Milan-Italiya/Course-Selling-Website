import React from 'react'
import '../css/CourseCard.css' // Import your CSS file for styling
import { useNavigate } from 'react-router-dom'

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="course-list">
        {course.length > 0 ? course.map((course, index) => (
          <div className="course-card" key={index}>
            <img src={course.image.url} alt={course.title} className="course-image" />
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            {/* <p>₹ {course.price}</p> */}
            <button type='button' className="course-btn" onClick={() => { navigate(`/courses/${course._id}`) }}>View More</button>
          </div>
        )) : (
          <div className="course-error">No courses found</div>
        )}
      </div>
    </div>
  )
}

export default CourseCard
