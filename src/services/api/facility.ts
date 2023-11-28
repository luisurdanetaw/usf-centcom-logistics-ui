export const searchFacilityByName = async (name:string): Promise<any> => {
    console.log("Searching facility " + name);
    const url = `http://127.0.0.1:8000/user/findFacility?name=${name}`;

    return fetch(url)
        .then((response) => response.json())
        .catch((error) => {
            console.error("Fetch error: ", error);
            return false;
        });
};

export const searchFacilityBySupplies = async (userId: string = "1", supply: string, page?: number): Promise<any> => {
    console.log("Searching facilities by supply" + supply);
    const url = `http://127.0.0.1:8000/user/findFacilitiesWithSupplies?user_id=${userId}&supply=${supply}&page=${page}`;

    return fetch(url)
        .then((response) => response.json())
        .catch((error) => {
            console.error("Fetch error: ", error);
            return false;
        });
};

export const findAllFacilities = async (): Promise<any> => {
    const url = `http://127.0.0.1:8000/user/findAllFacilities`;

    return fetch(url)
        .then((response) => response.json())
        .catch((error) => {
            console.error("Fetch error: ", error);
            return false;
        });
};
