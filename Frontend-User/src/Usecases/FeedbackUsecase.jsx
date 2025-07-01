import { feedback } from "../Datasources/UserDatasource.jsx"

export const feedbackUsecase = async (feedbackData) => {
    return await feedback(feedbackData)
}