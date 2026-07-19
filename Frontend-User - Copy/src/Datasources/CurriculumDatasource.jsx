export const getCurriculumByCourse = async (courseId) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/v1/curriculum/curriculum/${courseId}`,
    );
    const data = await response.json(courseId);
    console.log("datassnono: ",data);
    
    return data
  } catch (error) {
    console.log("Error in getting curriculums: ", error);
  }
};
