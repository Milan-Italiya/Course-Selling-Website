import { getPurchases } from "../Datasources/UserDatasource.jsx"

export const getPurchaseUseCase = async () => {
    return await getPurchases()
}