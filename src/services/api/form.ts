export const sendForm = async (url: string, params: any ): Promise<any> => {
    console.log("Sending Form", params);

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    };

    return fetch(url, requestOptions)
        .then((response) => {
            return response.ok
        })
        .catch((error) => {
            console.error("Fetch error: ", error);
            return false;
        });
};
