import { getCurriculumByCourseData } from "../Datasources/CurriculumDatasource.jsx"

export const getCurriculumByCourseUsecase = async (courseId) => {
    return await getCurriculumByCourseData(courseId)
}