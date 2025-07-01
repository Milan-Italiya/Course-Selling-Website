import React, { useContext, useEffect } from 'react';
import '../css/Course.css';
import CourseCard from '../components/CourseCard.jsx';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CourseContext } from '../Context/CourseContext';
import { useNavigate } from 'react-router-dom';

const Course = () => {
    const { course, fetchCourses, fetchCoursesBySearch } = useContext(CourseContext);
    const navigate = useNavigate()
    console.log("course data : ", course)
    useEffect(() => {
        const token = sessionStorage.getItem('token')
        if (!token) {
            navigate('/login', { state: { loginerrMessage: 'please login first to access our website' } });
        }
        fetchCourses();
    }, [])

    useEffect(() => {
     window.scrollTo(0, 0);
    }, [])
    


    return (
        <>
            <Navbar />
            <form action="">
                <div className="course-container">
                    <h2 className="course-heading">Our Courses</h2>
                    <div className="search-container">
                        <i className="fas fa-search"></i>
                        <input type="text" name="searchbox" id="searchbox" placeholder="Search Courses..." onChange={(e) => { fetchCoursesBySearch(e.target.value) }} />
                    </div>
                    <CourseCard course={course} />
                </div>
            </form>
            <Footer />
        </>
    );
};

export default Course;
