import { deleteCurriculum } from "../Datasources/CurriculumDatasource.jsx"

export const deleteCurriculumUsecase = async (curriculumId) => {
    return await deleteCurriculum(curriculumId)
}