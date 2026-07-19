import { useState, createContext } from "react";

import { getAllCurriculumUsecase } from "../Usecases/CurriculumUsecase.jsx";
import { updateCurriculumUsecase } from "../Usecases/UpdateCurriculumUsecase.jsx";
import { getcurriculumByIdUsecase } from "../Usecases/CurriculumByIdUsecase.jsx";
import { deleteCurriculumUsecase } from "../Usecases/DeleteCurriculum.jsx";
import { getCurriculumByCountUsecase } from "../Usecases/CurriculumsCountUsecase.jsx";
import { createCurriculumUsecase } from "../Usecases/CreateCurriculumUsecase.jsx";
import { getCurriculumByCourseUsecase } from "../Usecases/CurriculumByCourseUsecase.jsx";

export const CurriculumContext = createContext();

export const CurriculumProvider = ({ children }) => {
  // Store only the array
  const [curriculums, setCurriculums] = useState([]);

  const [updatedCurriculum, setUpdatedCurriculum] = useState(null);
  const [curriculumById, setCurriculumById] = useState(null);
  const [curriculumByCount, setCurriculumByCount] = useState(0);
  const [createdCurriculum, setCreatedCurriculum] = useState({});
  const [curriculumByCourse, setCurriculumByCourse] = useState([])

  const fetchAllCurriculums = async () => {
    try {
      const data = await getAllCurriculumUsecase();

      console.log("All curriculum response from backend:", data);

      if (!data?.success) {
        throw new Error(data?.message || "Failed to fetch curriculums");
      }

      const curriculumData = Array.isArray(data.curriculum)
        ? data.curriculum
        : [];

      setCurriculums(curriculumData);

      return data;
    } catch (error) {
      console.log("Context fetch curriculum error:", error.message);

      setCurriculums([]);
      throw error;
    }
  };

  const fetchCurriculumByCount = async () => {
    try {
      const response = await getCurriculumByCountUsecase();

      console.log("Curriculum count response:", response);

      setCurriculumByCount(Number(response) || 0);

      return response;
    } catch (error) {
      console.log("Error fetching curriculum count:", error.message);

      setCurriculumByCount(0);
      throw error;
    }
  };

  const fetchUpdateCurriculum = async (curriculumId, curriculumData) => {
    try {
      const response = await updateCurriculumUsecase(
        curriculumId,
        curriculumData,
      );

      console.log("Updated curriculum response:", response);

      setUpdatedCurriculum(response);

      return response;
    } catch (error) {
      console.log("Error updating curriculum:", error.message);
      throw error;
    }
  };

  const fetchCurriculumById = async (curriculumId) => {
    try {
      const response = await getcurriculumByIdUsecase(curriculumId);

      console.log("Curriculum by ID response:", response);

      setCurriculumById(response);

      return response;
    } catch (error) {
      console.log("Error fetching curriculum by ID:", error.message);
      throw error;
    }
  };

  const fetchCreateCurriculum = async (curriculumData) => {
    try {
      const response = await createCurriculumUsecase(curriculumData);

      console.log("Create curriculum response:", response);

      setCreatedCurriculum(response);

      return response;
    } catch (error) {
      console.log("Error creating curriculum:", error.message);
      throw error;
    }
  };

  const fetchDeleteCurriculum = async (curriculumId) => {
    try {
      const response = await deleteCurriculumUsecase(curriculumId);

      if (response?.success) {
        setCurriculums((previousCurriculums) =>
          previousCurriculums.filter(
            (item) => item._id !== curriculumId,
          ),
        );

        setCurriculumByCount((previousCount) =>
          Math.max(previousCount - 1, 0),
        );
      }

      return response;
    } catch (error) {
      console.log("Error deleting curriculum:", error.message);
      throw error;
    }
  };

  const fetchCurriculumByCourse = async (courseId) => {
    try {
      const data = await getCurriculumByCourseUsecase(courseId);

      console.log("Curriculum by course response:", data);

      const curriculumData = Array.isArray(data?.curriculum)
        ? data.curriculum
        : [];

      setCurriculumByCourse(curriculumData);

      return data;
    } catch (error) {
      console.log("Context fetch curriculum by course error:", error.message);

      setCurriculumByCourse([]);

      return {
        success: false,
        message: error.message,
        curriculum: [],
      };
    }
  };


  return (
    <CurriculumContext.Provider
      value={{
        curriculums,
        createdCurriculum,
        updatedCurriculum,
        curriculumById,
        curriculumByCount,
        curriculumByCourse,
        fetchAllCurriculums,
        fetchUpdateCurriculum,
        fetchCurriculumById,
        fetchDeleteCurriculum,
        fetchCurriculumByCount,
        fetchCreateCurriculum,
        fetchCurriculumByCourse
      }}
    >
      {children}
    </CurriculumContext.Provider>
  );
};