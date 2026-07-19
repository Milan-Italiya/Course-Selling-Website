import { getAllCurriculums } from "../Datasources/CurriculumDatasource.jsx"

export const getAllCurriculumUsecase = async () => {
    return await getAllCurriculums()
}