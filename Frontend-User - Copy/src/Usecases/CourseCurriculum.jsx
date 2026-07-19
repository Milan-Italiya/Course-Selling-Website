import { getCurriculumByCourse } from "../Datasources/CurriculumDatasource.jsx"

export const getCurriculumByCourseUsecase = async (courseId) => {
    return await getCurriculumByCourse(courseId);
}