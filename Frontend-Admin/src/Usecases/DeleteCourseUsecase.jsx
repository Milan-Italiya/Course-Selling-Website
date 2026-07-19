import { deleteCourseData } from "../Datasources/CourseDatasource.jsx"

export const deleteCourseUsecase = async (courseId) => {
    return await deleteCourseData(courseId)
}