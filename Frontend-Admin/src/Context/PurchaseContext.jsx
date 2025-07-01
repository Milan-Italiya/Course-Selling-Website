import { createContext, useState } from "react";
import { getPurchasesUsecase } from "../Usecases/PurchaseUsecase.jsx";

export const PurchaseContext = createContext()

export const PurchaseProvider = ({ children }) => {
    const [purchases, setPurchases] = useState([])

    const fetchPurchases = async () => {
        const response = await getPurchasesUsecase()
        setPurchases(response)
        console.log("purchase in context: ", response)
    }
    return (
        <PurchaseContext.Provider value={{ purchases, fetchPurchases }}>
            {children}
        </PurchaseContext.Provider>
    )
}