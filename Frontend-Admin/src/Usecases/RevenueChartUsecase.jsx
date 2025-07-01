import { getRevenueChart } from "../Datasources/OrderDatasource.jsx"

export const getRevenueChartUseCase = async () => {
    return await getRevenueChart()
}