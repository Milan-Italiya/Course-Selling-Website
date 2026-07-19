import { updateLessonProgressData } from "../Datasources/coursePlayerDatasource.jsx";

export const updateLessonProgressUsecase = async (courseId,lessonId,progressData) => {
  return await updateLessonProgressData(courseId, lessonId, progressData);
};
