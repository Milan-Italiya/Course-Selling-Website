export const getAllCurriculums = async () => {
  const response = await fetch(
    "http://localhost:5000/api/v1/curriculum/get-curriculums",
  );

  const data = await response.json();

  console.log("Get all curriculums datasource response:", data);

  // if (!response.ok) {
  //   throw new Error(data?.message || "Unable to fetch curriculums");
  // }

  return data;
};

export const getCurriculumsByCount = async () => {
  const response = await fetch(
    "http://localhost:5000/api/v1/curriculum/get-curriculums",
  );

  const data = await response.json();

  console.log("Curriculum count datasource response:", data);

  // if (!response.ok) {
  //   throw new Error(data?.message || "Unable to fetch curriculum count");
  // }

  return Array.isArray(data?.curriculum) ? data.curriculum.length : 0;
};

/* GET SINGLE CURRICULUM */

export const getCurriculumById = async (
  curriculumId
) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/v1/curriculum/get-curriculum/${curriculumId}`
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(
      "error in getting Curriculum by id",
      error.message
    );
  }
};

/* UPDATE CURRICULUM */

export const updateCurriculum = async (
  curriculumId,
  curriculumData
) => {
  try {
    const token = sessionStorage.getItem("token");

    const response = await fetch(
      `http://localhost:5000/api/v1/curriculum/update-curriculum/${curriculumId}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(curriculumData),
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(
      "error in updating Curriculum",
      error.message
    );
  }
};

export const deleteCurriculum = async (curriculumId) => {
  const token = sessionStorage.getItem("token")
  const response = await fetch(`http://localhost:5000/api/v1/curriculum/delete-curriculum/${curriculumId}`,
    {
      method: "DELETE",

      headers: {
        Authorization: `Bearer ${token}`,

        "Content-Type": "application/json",
      },
    },
  )

  const data = await response.json()
  return data
}

export const createCurriculumData = async (curriculumData) => {
  const token = sessionStorage.getItem("token");

  const response = await fetch(
    "http://localhost:5000/api/v1/curriculum/add-curriculum",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(curriculumData),
    }
  );

  const data = await response.json();

  console.log("Create curriculum datasource:", data);

  return data;
};

export const getCurriculumByCourseData = async (courseId) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/v1/curriculum/course/${courseId}`
    );

    const data = await response.json();
    console.log("Curriculum by course datasource response:", data);
    return data;
  } catch (error) {
    console.log("Error in get curriculum by course:", error.message);
  }
};