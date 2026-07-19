import { updateCourseData } from "../Datasources/CourseDatasource.jsx";

export const updateCourseUsecase = async (courseId, formData) => {
  return await updateCourseData(courseId, formData);
};
