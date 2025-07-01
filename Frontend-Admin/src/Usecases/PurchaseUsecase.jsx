import { getPurchases } from "../Datasources/PurchaseDatasource.jsx"

export const getPurchasesUsecase = async () => {
    return await getPurchases()
}
