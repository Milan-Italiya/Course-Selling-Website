import React from 'react'
import '../css/purchaseCard.css' // Import your CSS file for styling

const purchaseCard = ({ purchases }) => {
    // console.log("card purchases",purchases.purchased.length)
    return (
        <div>
            <div className="purchase-list">
                {purchases?.length > 0 ? purchases?.map((purchase, index) => (
                    <div className="purchase-card" key={index}>
                        <img src={purchase.image.url && purchase.image.url} alt={purchase.title} className="purchase-image" />
                        <h3>{purchase.title}</h3>
                        {/* <p>{purchase.description}</p> */}
                        <p>${purchase.price}</p>
                        <p>Purchased Time: {new Date(purchase.createdAt).toLocaleTimeString()}</p>
                        <p>Purchased Date: {new Date(purchase.createdAt).toLocaleDateString()}</p>
                    </div>
                )) : (
                    <div className="purchase-error">You have not purchase any course yet.</div>
                )}
            </div>
        </div>
    )
}

export default purchaseCard
