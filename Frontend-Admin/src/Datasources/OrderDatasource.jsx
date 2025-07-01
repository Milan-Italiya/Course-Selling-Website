export const getOrders = async () => {
    const token = sessionStorage.getItem('token')
    try {
        const response = await fetch('http://localhost:5000/api/v1/order/orders', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await response.json()
        return data.orders
    } catch (error) {
        console.log('Error in getting orders:', error.message)
        throw error
    }
}

export const getOrdersByCount = async () => {
    const token = sessionStorage.getItem('token')
    try {
        const response = await fetch('http://localhost:5000/api/v1/order/orders', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await response.json()
        return data.orders
    } catch (error) {
        console.log('Error in getting orders:', error.message)
        throw error
    }
}

export const getRevenue = async () => {
    const token = sessionStorage.getItem('token')
    try {
        const response = await fetch('http://localhost:5000/api/v1/order/revenue', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await response.json()
        return data.totalRevenue
    } catch (error) {
        console.log('Error in getting orders:', error.message)
        throw error
    }
}

export const getRevenueChart = async () => {
    try {
        const res = await fetch('http://localhost:5000/api/v1/order/revenue-chart')
        const data = await res.json()
        return data.revenues
    } catch (error) {
        console.log('Error in getting revenue chart:', error.message)
        throw error
    }
}

export const getRecentOrders = async () => {
    const token = sessionStorage.getItem('token')
    try {
        const response = await fetch('http://localhost:5000/api/v1/order/recent-orders', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        console.log('recent Data', data)
        return data.recentOrders
    } catch (error) {
        console.log('Error in getting recent orders:', error.message)
        throw error
    }
}