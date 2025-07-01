export const getTeams = async () => {
    const response = await fetch(`http://localhost:5000/api/v1/team/members`)
    const data = await response.json()
    return data
}

