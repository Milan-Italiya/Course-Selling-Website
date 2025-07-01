import { createContext, useState } from "react";
import { getTeamsUsecase } from "../Usecases/TeamsUsecase.jsx";

export const TeamContext = createContext()

export const TeamProvider = ({ children }) => {

    const [teams, setTeams] = useState([])
    const fetchTeams = async () => {
        const res = await getTeamsUsecase()
        console.log("teams in context: ", res);
        setTeams(res)
    }
    return (
        <TeamContext.Provider value={{ teams, fetchTeams }}>
            {children}
        </TeamContext.Provider>
    )
}