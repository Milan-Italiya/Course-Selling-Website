import { createCourseData } from "../Datasources/CourseDatasource.jsx"

export const createCourseUsecase = async (courseData) => {
    return await createCourseData(courseData);
}