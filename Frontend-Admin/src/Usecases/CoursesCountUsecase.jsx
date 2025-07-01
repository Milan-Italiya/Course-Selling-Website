import { getCoursesByCount } from "../Datasources/CourseDatasource.jsx"

export const getCoursesByCountUsecase = async () => {
    return await getCoursesByCount()
}