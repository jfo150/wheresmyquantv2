export const createCheckoutSession = async () => {
    try {
        const response = await fetch('/api/payments/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error creating checkout session", error);
    }
};

export const getSessionStatus = async (sessionId) => {
    try {
        const response = await fetch(`/api/payments/session-status?session_id=${sessionId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching session status", error);
    }
};
