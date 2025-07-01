import { getRevenue } from "../Datasources/OrderDatasource.jsx"

export const getRevenueUseCase = async () => {
    try {
        return await getRevenue()
    } catch (error) {
        console.log('Error in getting revenue:', error.message)
        throw error
    }
}