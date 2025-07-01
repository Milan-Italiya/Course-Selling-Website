import { createContext, useState } from "react";
import { getTeamMembersUsecase } from "../Usecases/TeamsUsecase.jsx";

export const TeamContext = createContext()

export const TeamProvider = ({ children }) => {
    const [teams, setTeams] = useState([])

    const fetchTeamMembers = async () => {
        const res = await getTeamMembersUsecase()
        setTeams(res);
    }
    return (
        <TeamContext.Provider value={{ teams, fetchTeamMembers }}>
            {children}
        </TeamContext.Provider>
    );
};