import { createContext, useState } from "react";
import { getPurchaseUseCase } from "../Usecases/PurchaseUsecase.jsx";
import { getPurchaseBySearchUseCase } from "../Usecases/SearchPurchaseUsecase.jsx";
import { feedbackUsecase } from "../Usecases/FeedbackUsecase.jsx";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [purchase, setPurchases] = useState([]);

    const fetchPurchases = async () => {
        try {
            const response = await getPurchaseUseCase();
            setPurchases(response);
            return response
        } catch (error) {
            console.error("Failed to fetch purchases:", error);
        }
    };

    const fetchPurchasesBySearch = async (searchbox) => {
        const response = await getPurchaseBySearchUseCase()
        const filteredPurchases = response.filter(purchase =>
            purchase.title.toUpperCase().includes(searchbox.toUpperCase())
        )
        setPurchases(filteredPurchases)
    }

    const fetchFeedBackData = async (feedbackData) => {
        const response = await feedbackUsecase(feedbackData)
        return response
    }


    return (
        <UserContext.Provider value={{ purchase, fetchPurchases, fetchPurchasesBySearch, fetchFeedBackData }}>
            {children}
        </UserContext.Provider>
    );
};
