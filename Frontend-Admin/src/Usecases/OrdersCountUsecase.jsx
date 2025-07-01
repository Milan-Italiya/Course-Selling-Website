import { getOrdersByCount } from "../Datasources/OrderDatasource.jsx"

export const getOrdersByCountUseCase = async () => {
    return await getOrdersByCount()
}