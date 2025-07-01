import { getTeamMembers } from "../Datasources/TeamDatasource.jsx"

export const getTeamMembersUsecase = async () => {
    return await getTeamMembers()
}