import { getUserById } from "../Datasources/UserDatasource.jsx"

export const getUserByIdUseCase = async (userId) => {
    return await getUserById(userId);
}