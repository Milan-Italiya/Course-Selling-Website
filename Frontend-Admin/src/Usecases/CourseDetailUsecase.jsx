import { getCourseDetail } from "../Datasources/CourseDatasource.jsx";

export const getCourseDetailUsecase = async (courseId) => {
  return await getCourseDetail(courseId);
};
