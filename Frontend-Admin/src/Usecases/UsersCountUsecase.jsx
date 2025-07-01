import { getUsersByCount } from "../Datasources/UserDatasource.jsx"

export const getUserByCountUsecase = async () => {
    return await getUsersByCount()
}