import { createContext, useState } from "react";
import { getUserByCountUsecase } from "../Usecases/UsersCountUsecase.jsx";
import { getUsersUsecase } from "../Usecases/UserUsecase.jsx";

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState([])
    const [userByCount, setUserByCount] = useState(0)

    const fetchUsers = async () => {
        try {
            const response = await getUsersUsecase()
            console.log("users in context", response);
            setUser(response)
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
    return (
        <UserContext.Provider value={{ user, userByCount, fetchUsersByCount, fetchUsers }}>
            {children}
        </UserContext.Provider>
    )
}
