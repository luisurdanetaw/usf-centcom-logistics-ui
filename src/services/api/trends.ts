export interface TrendData {
    tmrsCompleted: any;
    tmrsReceived: any;
    shipmentSpeed: any;
    delayedShipments: any;
}

const fetchTrends = async (facilityId: string) => {
    const endpoints = [
        `http://localhost:8000/trends/tmrsCompleted?facility_id=${facilityId}`,
        `http://localhost:8000/trends/tmrsReceived?facility_id=${facilityId}`,
        `http://localhost:8000/trends/shipmentSpeed?facility_id=${facilityId}`,
        `http://localhost:8000/trends/delayedShipments?facility_id=${facilityId}`,
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
        };

        // Return the parsed data
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export default fetchTrends;