import { getCurriculumById } from "../Datasources/CurriculumDatasource.jsx";

export const getcurriculumByIdUsecase = async (curriculumId) => {
  return await getCurriculumById(curriculumId);
};
