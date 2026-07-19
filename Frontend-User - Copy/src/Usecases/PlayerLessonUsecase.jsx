import { getPlayerLessonData } from "../Datasources/coursePlayerDatasource.jsx";

export const getPlayerLessonUsecase = async (courseId, lessonId) => {
  return await getPlayerLessonData(courseId, lessonId);
};