export interface TrendData {
    tmrsCompleted: any;
    tmrsReceived: any;
    shipmentSpeed: any;
    delayedShipments: any;
    topRequestors:any;
}

const fetchTrends = async (country: string) => {
    const endpoints = [
        `http://localhost:8000/trends/tmrsCompleted?country=${country}`,
        `http://localhost:8000/trends/tmrsReceived?country=${country}`,
        `http://localhost:8000/trends/shipmentSpeed?country=${country}`,
        `http://localhost:8000/trends/delayedShipments?country=${country}`,
        `http://localhost:8000/trends/topRequestors?country=${country}`
    ];

    try {
        // Fetch data from all endpoints concurrently
        const responses = await Promise.all(endpoints.map((endpoint) => fetch(endpoint)));

        // Parse response data
        const data: TrendData = {
            tmrsCompleted: await responses[0].json(),
            tmrsReceived: await responses[1].json(),
            shipmentSpeed: await responses[2].json(),
            delayedShipments: await responses[3].json(),
            topRequestors: await responses[4].json()
        };

        // Return the parsed data
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export default fetchTrends;