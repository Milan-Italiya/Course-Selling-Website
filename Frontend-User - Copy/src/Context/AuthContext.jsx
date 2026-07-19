import React, { createContext } from 'react';
import { signupUsecase } from '../Usecases/SignupUsecase.jsx';
import { loginUsecase } from '../Usecases/LoginUsecase.jsx';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const handleSignup = async (userData) => {
        return await signupUsecase(userData);
    };

    const handleLogin = async (userData) => {
        return await loginUsecase(userData)
    }
    return (
        <AuthContext.Provider value={{ handleSignup,handleLogin }}>
            {children}
        </AuthContext.Provider>
    );
};