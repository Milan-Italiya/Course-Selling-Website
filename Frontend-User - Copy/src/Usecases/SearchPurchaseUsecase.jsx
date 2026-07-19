import { getPurchasesBySearch } from "../Datasources/UserDatasource.jsx"

export const getPurchaseBySearchUseCase = async () => {
    return await getPurchasesBySearch()
}