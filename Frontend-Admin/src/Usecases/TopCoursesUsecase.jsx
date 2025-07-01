import { getTopCourses } from "../Datasources/CourseDatasource.jsx"

export const getTopCoursesUseCase = async () => {
    return await getTopCourses()
}