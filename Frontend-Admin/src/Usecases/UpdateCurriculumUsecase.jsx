import { updateCurriculum } from "../Datasources/CurriculumDatasource.jsx";

export const updateCurriculumUsecase = async (curriculumId, curriculumData) => {
  return await updateCurriculum(curriculumId, curriculumData);
};
