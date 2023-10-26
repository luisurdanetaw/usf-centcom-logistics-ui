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
