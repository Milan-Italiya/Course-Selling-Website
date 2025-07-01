import { createContext, useState } from "react";
import { getOrdersUseCase } from "../Usecases/OrderUsecase.jsx";
import { getOrdersByCountUseCase } from "../Usecases/OrdersCountUsecase.jsx";
import { getRevenueUseCase } from "../Usecases/RevenueUsecase.jsx";
import { getRecentOrdersUseCase } from "../Usecases/RecentOrderUsecase.jsx";
import { getRevenueChartUseCase } from "../Usecases/RevenueChartUsecase.jsx";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([])
    const [ordersByCount, setOrdersByCount] = useState([])
    const [revenue, setRevenue] = useState([])
    const [revenueChart, setRevenueChart] = useState([])
    const [recentOrders, setRecentOrders] = useState([])

    const fetchOrders = async () => {
        try {
            const response = await getOrdersUseCase()
            console.log("orders in context: ", response)
            setOrders(response)
        } catch (error) {
            console.log("Error in getting orders: ", error.message)
            throw new Error("Failed to fetch orders")
        }
    }

    const fetchOrdersByCount = async () => {
        try {
            const response = await getOrdersByCountUseCase()
            console.log("orders in context: ", response)
            setOrdersByCount(response.length)
        } catch (error) {
            console.log("Error in getting orders count: ", error.message)
            throw new Error("Failed to fetch orders count")
        }
    }

    const fetchRevenue = async () => {
        try {
            const res = await getRevenueUseCase()
            console.log("revenue in context: ", res)
            setRevenue(res)
        } catch (error) {
            console.log("Error in getting revenue: ", error.message)
            throw new Error("Failed to fetch revenue")
        }
    }

    const fetchRevenueChartData = async () => {
        try {
            const res = await getRevenueChartUseCase()
            console.log("revenue in context: ", res)
            setRevenueChart(res)
        } catch (error) {
            console.log("Error in getting revenue chart", error.message)
            throw new Error("Failed to fetch revenue chart")
        }
    }

    const fetchRecentOrders = async () => {
        try {
            const recentOrders = await getRecentOrdersUseCase()
            console.log("recent orders in context: ", recentOrders)
            setRecentOrders(recentOrders);
        } catch (error) {
            console.log("Error in getting recent orders: ", error.message)
            throw new Error("Failed to fetch recent orders")
        }
    }
    return (
        <OrderContext.Provider value={{ orders, ordersByCount, revenue, revenueChart, recentOrders, fetchOrders, fetchOrdersByCount, fetchRevenue, fetchRecentOrders, fetchRevenueChartData }}>
            {children}
        </OrderContext.Provider>
    );
};
