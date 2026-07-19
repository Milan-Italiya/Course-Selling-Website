import { createContext, useState } from "react";
import { getCoursesUsecase } from "../usecases/courseUsecase.jsx";
import { getCoursesBySearchUsecase } from "../Usecases/SearchCourseUsecase.jsx";
import { getCoursesByCountUsecase } from "../Usecases/CoursesCountUsecase.jsx";
import { getTopCoursesUseCase } from "../Usecases/TopCoursesUsecase.jsx";
import { getCourseDetailUsecase } from "../Usecases/CourseDetailUsecase.jsx";
import { createCourseUsecase } from "../Usecases/CreateCourseUsecase.jsx";
import { updateCourseUsecase } from "../Usecases/UpdateCourseUsecase.jsx";
import { deleteCourseUsecase } from "../Usecases/DeleteCourseUsecase.jsx";
export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [course, setCourse] = useState([]);
  const [coursesByCount, setCoursesByCount] = useState(0)
  const [topCourses, setTopCourses] = useState([])
  const [createCourse, setCreateCourse] = useState([])
  const [courseDetail, setCourseDetail] = useState([])
  const [updatedCourse, setUpdatedCourse] = useState([])

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
      course.title?.toUpperCase().includes(searchbox.toUpperCase())
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

  const fetchCreateCourse = async (courseData) => {
    const response = await createCourseUsecase(courseData)
    setCreateCourse(response)
    return response
  }

  const fetchCourseDetail = async (courseId) => {
    const response = await getCourseDetailUsecase(courseId)
    setCourseDetail(response)
    return response
  }

  const fetchUpdateCourse = async (courseId, formData) => {
    const response = await updateCourseUsecase(courseId, formData);
    setUpdatedCourse(response);
    return response;
  };

  const fetchDeleteCourse = async (courseId) => {
    const response = await deleteCourseUsecase(courseId);
    if (response?.success) {
      setCourse((prev) =>
        prev.filter((item) => item._id !== courseId)
      );
      // setCoursesByCount((prev) => prev - 1);
    }
    return response;
  };


  return (
    <CourseContext.Provider value={{ course, coursesByCount, topCourses, createCourse, courseDetail, updatedCourse, fetchCourses, fetchCoursesBySearch, fetchCoursesByCount, fetchTopCourses, fetchCourseDetail, fetchCreateCourse, fetchUpdateCourse, fetchDeleteCourse }}>
      {children}
    </CourseContext.Provider>
  );
};
