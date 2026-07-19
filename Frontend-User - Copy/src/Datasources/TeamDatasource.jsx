export const getTeamMembers = async () => {
    try {
        const res = await fetch(`http://localhost:5000/api/v1/team/members`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        return data.teams;
    } catch (error) {
        console.error('Error fetching teams:', error)
        throw new Error('Failed to fetch teams')
    }
}