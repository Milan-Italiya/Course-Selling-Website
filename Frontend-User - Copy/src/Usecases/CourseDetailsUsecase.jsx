import { getCourseDetails } from "../Datasources/CourseDatasource.jsx";

export const getCourseDetailsUsecase = async (courseId) => {
    return await getCourseDetails(courseId);
}