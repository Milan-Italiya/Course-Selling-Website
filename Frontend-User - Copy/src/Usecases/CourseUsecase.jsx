import { getCourses } from "../Datasources/CourseDatasource.jsx";

export const getCoursesUsecase = async () => {
    return await getCourses();
}