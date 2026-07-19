import { getOrderDetail } from "../Datasources/OrderDatasource.jsx"

export const getOrderDetailUsecase = async (orderId) => {
    return await getOrderDetail(orderId)
}