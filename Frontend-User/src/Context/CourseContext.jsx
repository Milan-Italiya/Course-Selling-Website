  import { createContext, useState } from "react";
  import { getCoursesUsecase } from "../usecases/courseUsecase.jsx";
  import { getCourseDetailsUsecase } from "../Usecases/CourseDetailsUsecase.jsx";
  import { getCoursesBySearchUsecase } from "../Usecases/SearchCourseUsecase.jsx";
  import { BuyCourseUseCase } from "../Usecases/BuyCourseUsecase.jsx";
  import { orderCourseUsecase } from "../Usecases/OrderCourseUsecase.jsx";
  export const CourseContext = createContext();

  export const CourseProvider = ({ children }) => {
    const [course, setCourse] = useState([]);
    const [courseDetails, setCourseDetails] = useState([]);
    const [order, setOrder] = useState([])

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

    const fetchCourseDetails = async (courseId) => {
      try {
        const response = await getCourseDetailsUsecase(courseId);
        console.log("Course details: ", response);
        setCourseDetails(response);
      } catch (error) {
        console.error("Failed to fetch course details:", error);
      }
    };

    const fetchBuyCourse = async (courseId) => {
      try {
        const response = await BuyCourseUseCase(courseId);
        console.log("Buy Course details: ", response);
        return response;
      } catch (error) {
        console.error("Failed to fetch buy course details:", error);
      }
    }

    const fetchOrderCourse = async (orderData) => {
      try {
        const response = await orderCourseUsecase(orderData);
        console.log("Order Course details: ", response);
        setOrder(response)
        return response;
      } catch (error) {
        console.log("Failed to fetch order course details:", error);
      }
    }
    return (
      <CourseContext.Provider value={{ course, courseDetails, order, fetchCourses, fetchCourseDetails, fetchCoursesBySearch, fetchBuyCourse, fetchOrderCourse }}>
        {children}
      </CourseContext.Provider>
    );
  };
