import { getUsers } from "../Datasources/UserDatasource.jsx"

export const getUsersUsecase = async () => {
    return await getUsers()
}