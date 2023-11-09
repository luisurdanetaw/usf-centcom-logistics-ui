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