import { loginAPI } from "../Datasources/AuthDatasource.jsx"

export const loginUsecase = async (userData) => {
    return await loginAPI(userData)
}