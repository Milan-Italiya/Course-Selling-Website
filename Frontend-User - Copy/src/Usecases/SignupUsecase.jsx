import { signupAPI } from "../Datasources/AuthDatasource.jsx";

export const signupUsecase = async (userData) => {
    return await signupAPI(userData);
};
