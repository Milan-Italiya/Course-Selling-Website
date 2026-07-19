import { getCurriculumsByCount } from "../Datasources/CurriculumDatasource.jsx"

export const getCurriculumByCountUsecase = async () => {
    return await getCurriculumsByCount()
}