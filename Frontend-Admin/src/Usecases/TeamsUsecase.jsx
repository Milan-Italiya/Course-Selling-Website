import { getTeams } from "../Datasources/TeamDatasourse.jsx"

export const getTeamsUsecase = async () => {
    return await getTeams()
}