export const getPurchases = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
        throw new console.error('No token found');
    }

    const response = await fetch('http://localhost:5000/api/v1/user/purchased', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
        },
        credentials: 'include'
    })

    const data = await response.json()
    return data
}
