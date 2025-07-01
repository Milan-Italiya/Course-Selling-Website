import { getRecentOrders } from "../Datasources/OrderDatasource.jsx"

export const getRecentOrdersUseCase = async () => {
    return await getRecentOrders()
}