import { createContext, useState } from "react";
import { getCoursesUsecase } from "../usecases/courseUsecase.jsx";
import { getCoursesBySearchUsecase } from "../Usecases/SearchCourseUsecase.jsx";
import { getCoursesByCountUsecase } from "../Usecases/CoursesCountUsecase.jsx";
import { getTopCoursesUseCase } from "../Usecases/TopCoursesUsecase.jsx";
export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [course, setCourse] = useState([]);
  const [coursesByCount, setCoursesByCount] = useState(0)
  const [topCourses, setTopCourses] = useState([])

  const fetchCourses = async () => {
    try {
      const response = await getCoursesUsecase();
      setCourse(response);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };

  const fetchCoursesBySearch = async (searchbox) => {
    const response = await getCoursesBySearchUsecase()
    const filteredCourses = response.filter(course =>
      course.title.toUpperCase().includes(searchbox.toUpperCase())
    )
    setCourse(filteredCourses)
  }

  const fetchTopCourses = async () => {
    const response = await getTopCoursesUseCase()
    setTopCourses(response)
  }
  const fetchCoursesByCount = async () => {
    const response = await getCoursesByCountUsecase()
    setCoursesByCount(response)
  }

  return (
    <CourseContext.Provider value={{ course, coursesByCount, topCourses, fetchCourses, fetchCoursesBySearch, fetchCoursesByCount, fetchTopCourses }}>
      {children}
    </CourseContext.Provider>
  );
};
