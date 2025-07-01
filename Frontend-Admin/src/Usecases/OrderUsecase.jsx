import { getOrders } from "../Datasources/OrderDatasource.jsx"

export const getOrdersUseCase = async () => {
    return await getOrders()
}