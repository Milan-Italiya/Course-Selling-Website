import { toast } from "react-toastify";

export const getPurchases = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
        // setErrMessage("Please login to purchase courses");
        toast.error("Please login to purchase courses");
        return;
    }
    const response = await fetch(`http://localhost:5000/api/v1/user/purchased`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });
    const data = await response.json();
    console.log("purchases data: ", data);
    // return data
    return {
        courseData: data.courseData,
        ok: response.ok,
        message: data.message,
        errors: data.errors || data.error || [],
        status: response.status,
        purchasedData: data.purchased
    }
}

export const getPurchasesBySearch = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
        // setErrMessage("Please login to purchase courses");
        toast.error("Please login to purchase courses");
        return;
    }
    const response = await fetch(`http://localhost:5000/api/v1/user/purchased`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });
    const data = await response.json();
    console.log("data", data);
    return data.courseData
}

export const feedback = async (feedbackData) => {
    const token = sessionStorage.getItem('token');
    if (!token) {
        toast.error("Please login to give feedback");
        return;
    }
    try {
        const response = await fetch(`http://localhost:5000/api/v1/user/feedback`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(feedbackData)
        })
        const data = await response.json();
        console.log("feedback data: ", data);
        return {
            status: response.status,
            data
        }
    } catch (err) {
        console.log('failed to send feedback data', err.message)
    }
}