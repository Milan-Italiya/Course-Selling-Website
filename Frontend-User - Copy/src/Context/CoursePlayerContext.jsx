import { useState, createContext } from "react";
import { getPlayerLessonUsecase } from "../Usecases/PlayerLessonUsecase.jsx";
import { updateLessonProgressUsecase } from "../Usecases/UpdateLessonProgressUsecase.jsx";

export const CoursePlayerContext = createContext();

export const CoursePlayerProvider = ({ children }) => {
    const [playerLesson, setPlayerLesson] = useState(null);
    const [playerAccess, setPlayerAccess] = useState(null);
    const [playerProgress, setPlayerProgress] = useState(null);

    const [loading, setLoading] = useState(false);
    const [playerError, setPlayerError] = useState(null);

    const fetchPlayerLesson = async (courseId, lessonId) => {
        try {
            setLoading(true);
            setPlayerError(null);

            const data = await getPlayerLessonUsecase(courseId, lessonId);

            console.log("Course player lesson response:", data);

            if (data?.success) {
                setPlayerLesson(data.lesson);
                setPlayerAccess(data.access);
                setPlayerProgress(data.progress);
            } else {
                setPlayerLesson(null);
                setPlayerAccess(null);
                setPlayerProgress(null);
                setPlayerError(data);
            }

            return data;
        } catch (error) {
            console.log("Fetch player lesson context error:", error.message);

            const errorData = {
                success: false,
                message: "Unable to load lesson.",
            };

            setPlayerError(errorData);

            return errorData;
        } finally {
            setLoading(false);
        }
    };

    const saveLessonProgress = async (courseId, lessonId, progressData) => {
        try {
            const data = await updateLessonProgressUsecase(
                courseId,
                lessonId,
                progressData,
            );

            console.log("Save lesson progress response:", data);

            if (data?.success) {
                setPlayerProgress(data.progress);
            }

            return data;
        } catch (error) {
            console.log("Save lesson progress context error:", error.message);

            return {
                success: false,
                message: "Unable to save lesson progress.",
            };
        }
    };

    return (
        <CoursePlayerContext.Provider value={{playerLesson, playerAccess, playerProgress, loading, playerError, fetchPlayerLesson, saveLessonProgress}}>
            {children}
        </CoursePlayerContext.Provider>
    );
};
