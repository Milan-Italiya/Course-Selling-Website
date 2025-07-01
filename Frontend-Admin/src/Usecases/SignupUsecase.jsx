import { signupAPI } from "../Datasources/AuthDatasource.jsx";

export const signupUsecase = async (adminData) => {
    return await signupAPI(adminData);
};
