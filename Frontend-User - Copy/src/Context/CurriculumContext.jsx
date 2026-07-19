import { createContext, useState } from "react";
import { getCurriculumByCourseUsecase } from "../Usecases/CourseCurriculum";

export const CurriculumContext = createContext();

export const CurriculumProvider = ({ children }) => {
  const [curriculumByCourse, setCurriculumByCourse] = useState({});
  const fetchCurriculumByCourse = async (courseId) => {
    try {
      const response = await getCurriculumByCourseUsecase(courseId);

      console.log("full response:", response);

      setCurriculumByCourse(response.curriculum);
    } catch (error) {
      console.error("Failed to fetch curriculum:", error);
    }
  };
  return (
    <CurriculumContext.Provider
      value={{ curriculumByCourse, fetchCurriculumByCourse }}
    >
      {children}
    </CurriculumContext.Provider>
  );
};
