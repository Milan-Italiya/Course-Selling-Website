import { deleteUserData } from "../Datasources/UserDatasource.jsx";

export const deleteUserUsecase = async (userId) => {
  return await deleteUserData(userId);
};