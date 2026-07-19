import { createCurriculumData } from "../Datasources/CurriculumDatasource.jsx";

export const createCurriculumUsecase = async (curriculumData) => {
  return await createCurriculumData(curriculumData);
};