import { updateOrderData } from "../Datasources/OrderDatasource.jsx"

export const updateOrderDataUsecase = async (orderId, orderData) => {
    return await updateOrderData(orderId, orderData)
}