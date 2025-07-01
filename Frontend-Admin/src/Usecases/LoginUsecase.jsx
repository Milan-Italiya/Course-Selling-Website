import { loginAPI } from "../Datasources/AuthDatasource.jsx"

export const loginUsecase = async (adminData) => {
    return await loginAPI(adminData)
}