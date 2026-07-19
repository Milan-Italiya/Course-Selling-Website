import { buyCourses } from "../Datasources/CourseDatasource.jsx"

export const BuyCourseUseCase = async (courseId) => {
return await buyCourses(courseId)
}