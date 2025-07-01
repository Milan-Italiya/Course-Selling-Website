import React, { useContext, useEffect } from 'react';
import '../css/Course.css';
import { CourseContext } from '../Context/CourseContext';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Sidebar from '../components/Sidebar';

const Course = () => {
  const { course, fetchCourses, fetchCoursesBySearch } = useContext(CourseContext);
  const navigate = useNavigate()
  console.log("course data : ", course)
  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if (!token) {
      navigate('/admin/login', { state: { loginerrMessage: 'please login first to admin dashboard' } });
    }
    fetchCourses();
  }, [])

  useEffect(() => {
    if (location.state && location.state.createMessage) {
      toast.success(location.state.createMessage)
    }
  }, [])


  const handleDeleteCourse = async (id) => {

    try {
      const token = sessionStorage.getItem("token");

      const response = await fetch(`http://localhost:5000/api/v1/course/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Course deleted successfully!");
        console.log(data.message);
        fetchCourses(); // Refresh course list
      } else {
        toast.error(data.errors || "Failed to delete course.");
      }

    } catch (error) {
      console.error("Delete error:", error);
      toast.error("An error occurred while deleting the course.");
    }
  };


  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <div id="divider">
        <div className="left-sidebar">
          <Sidebar />
        </div>
        <div className="right-content">
          <form action="">

            <div className="course-container">
              <h2 className="course-heading">Our Courses</h2>
              <div className="search-container">
                <i className="fas fa-search"></i>
                <input type="text" name="searchbox" id="searchbox" placeholder="Search Courses..." onChange={(e) => { fetchCoursesBySearch(e.target.value) }} />
              </div>
              <div className="icon-right">
                <span className='add-course'>Add courses</span>
                <i
                  className="fa-solid fa-plus add-course-icon"
                  onClick={() => navigate('/admin/create-course')}
                ></i>
              </div>

              <div className="course-list">
                {course.length > 0 ? course.map((course, index) => (
                  <div className="course-card" key={index}>
                    <img src={course.image.url} alt={course.title} className="course-image" />
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                    {/* <p>₹ {course.price}</p> */}
                    <div className="course-btn-container">
                      <button type='button' className="course-btn" onClick={() => navigate(`/admin/update-course/${course._id}`)}><i className="fa-solid fa-pen-to-square"></i> Edit</button>
                      <button type='button' className="course-btn" onClick={() => handleDeleteCourse(course._id)}><i className="fa-solid fa-trash"></i> Delete</button>
                    </div>
                  </div>
                )) : (
                  <div className="course-error">No courses found</div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Course;
