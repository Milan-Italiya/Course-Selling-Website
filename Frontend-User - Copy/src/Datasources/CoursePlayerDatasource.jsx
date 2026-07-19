const BASE_URL = "http://localhost:5000/api/v1/course-player";

const getToken = () => {
  return sessionStorage.getItem("token");
};

/* GET PLAYER LESSON */
export const getPlayerLessonData = async (courseId, lessonId) => {
  try {
    const token = getToken();

    const response = await fetch(
      `${BASE_URL}/course/${courseId}/lesson/${lessonId}`,
      {
        method: "GET",
        headers: {
          ...(token && {
            Authorization: `Bearer ${token}`,
          }),
        },
      },
    );

    const data = await response.json();

    return {
      status: response.status,
      ...data,
    };
  } catch (error) {
    console.log("Get player lesson datasource error:", error.message);

    return {
      success: false,
      message: "Unable to connect to course player server.",
    };
  }
};

/* SAVE LESSON PROGRESS */
export const updateLessonProgressData = async (
  courseId,
  lessonId,
  progressData,
) => {
  try {
    const token = getToken();

    if (!token) {
      return {
        success: false,
        message: "Please login to save progress.",
      };
    }

    const response = await fetch(
      `${BASE_URL}/course/${courseId}/lesson/${lessonId}/progress`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(progressData),
      },
    );

    const data = await response.json();

    return {
      status: response.status,
      ...data,
    };
  } catch (error) {
    console.log("Update lesson progress datasource error:", error.message);

    return {
      success: false,
      message: "Unable to save lesson progress.",
    };
  }
};