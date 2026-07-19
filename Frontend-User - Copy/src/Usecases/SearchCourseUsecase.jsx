import { getCoursesBySearch } from "../Datasources/CourseDatasource.jsx"

export const getCoursesBySearchUsecase = async () => {
    return await getCoursesBySearch()
}