export const getAllTmrsByFacility = async (facilityId:string): Promise<any> => {
    console.log("Getting TMRs - Facility Id: ", facilityId);
    const url = `http://127.0.0.1:8000/tmr/findAll?facility_id=${facilityId}`;

    return fetch(url)
        .then((response) => response.json())
        .catch((error) => {
            console.error("Fetch error: ", error);
            return false;
        });
};

export const updateTmr = async (id:string, params:any): Promise<any> => {
    const url = `http://127.0.0.1:8000/tmr/update?tmr_id=${id}`;

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    };

    return fetch(url, requestOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.error("Fetch error: ", error);
            return false;
        });
};