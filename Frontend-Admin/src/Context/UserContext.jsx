import { createContext, useState } from "react";
import { getUserByCountUsecase } from "../Usecases/UsersCountUsecase.jsx";
import { getUsersUsecase } from "../Usecases/UserUsecase.jsx";
import { getUserByIdUseCase } from "../Usecases/UserByIdUsecase.jsx";
import { deleteUserUsecase } from "../Usecases/DeleteUserUsecase.jsx";
import { updateUserUsecase } from "../Usecases/UpdateUserUsecase.jsx";

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState([])
    const [userByCount, setUserByCount] = useState(0)
    const [userById, setUserById] = useState({})
    const [updatedUser, setUpdatedUser] = useState({});


    const fetchUsers = async () => {
        try {
            const response = await getUsersUsecase()
            console.log("users in context", response);
            setUser(response)
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    }

    const fetchUserById = async (userId) => {
        try {
            const response = await getUserByIdUseCase(userId)
            console.log("user in context", response);
            setUserById(response)
            return response
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    }
    const fetchUsersByCount = async () => {
        try {
            const response = await getUserByCountUsecase()
            console.log("users in context", response);
            setUserByCount(response.length)
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    }

    const fetchDeleteUser = async (userId) => {
        const response = await deleteUserUsecase(userId);

        if (response?.success) {
            setUser((prev) => prev.filter((item) => item._id !== userId));
            setUserByCount((prev) => prev - 1);
        }

        return response;
    };

    const fetchUpdateUser = async (userId, userData) => {
        const response = await updateUserUsecase(userId, userData);
        setUpdatedUser(response);
        return response;
    };
    return (
        <UserContext.Provider value={{ user, userByCount, userById,updatedUser, fetchUsersByCount, fetchUsers, fetchUserById, fetchDeleteUser,fetchUpdateUser }}>
            {children}
        </UserContext.Provider>
    )
}
