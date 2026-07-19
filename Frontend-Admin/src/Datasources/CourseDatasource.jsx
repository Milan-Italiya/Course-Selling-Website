export async function getCourses() {
  try {
    const response = await fetch(
      "http://localhost:5000/api/v1/course/courses",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.course;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error; // rethrow so caller knows there was a failure
  }
}
export async function getCoursesByCount() {
  try {
    const response = await fetch(
      "http://localhost:5000/api/v1/course/courses",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.course.length;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error; // rethrow so caller knows there was a failure
  }
}
export async function getCoursesBySearch() {
  try {
    const response = await fetch(
      "http://localhost:5000/api/v1/course/courses",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("Courses: ", data);
    return data.course;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error; // rethrow so caller knows there was a failure
  }
}

export const getTopCourses = async () => {
  const token = sessionStorage.getItem("token");
  try {
    const response = await fetch(
      "http://localhost:5000/api/v1/course/top-courses",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await response.json();
    return data.PopularCourses;
  } catch (error) {
    console.error("Error fetching top courses:", error);
    throw error;
  }
};

export const createCourseData = async (courseData) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch("http://localhost:5000/api/v1/course/create", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: courseData,
    credentials: "include",
  });
  const data = await response.json();
  return data;
};

export const getCourseDetail = async (courseId) => {
  const response = await fetch(
    `http://localhost:5000/api/v1/course/${courseId}`,
    {
      credentials: "include",
    },
  );
  const data = await response.json();
  return data;
};

export const updateCourseData = async (courseId, formData) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(
    `http://localhost:5000/api/v1/course/update/${courseId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
      credentials: "include",
    },
  );
  const data = await response.json()
  return data;
};

export const deleteCourseData = async (courseId) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(
    `http://localhost:5000/api/v1/course/delete/${courseId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  return data;
};