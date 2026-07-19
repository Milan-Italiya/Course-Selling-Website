import { updateUserData } from "../Datasources/UserDatasource.jsx";

export const updateUserUsecase = async (userId, userData) => {
  return await updateUserData(userId, userData);
};