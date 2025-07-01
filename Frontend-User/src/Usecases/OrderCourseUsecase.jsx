import { orderCourse } from "../Datasources/CourseDatasource.jsx"

export const orderCourseUsecase = async (orderData) => {
    return await orderCourse(orderData)
}