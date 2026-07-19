import { topCourse } from "../Datasources/CourseDatasource.jsx"

export const topCourseUsecase = async(topCourseData)=>{
    return await topCourse(topCourseData);
}