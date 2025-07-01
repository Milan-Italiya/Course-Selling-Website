import React, { createContext } from 'react';
import { signupUsecase } from '../Usecases/SignupUsecase.jsx';
import { loginUsecase } from '../Usecases/LoginUsecase.jsx';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const handleSignup = async (adminData) => {
        return await signupUsecase(adminData);
    };

    const handleLogin = async (adminData) => {
        return await loginUsecase(adminData)
    }
    return (
        <AuthContext.Provider value={{ handleSignup,handleLogin }}>
            {children}
        </AuthContext.Provider>
    );
};