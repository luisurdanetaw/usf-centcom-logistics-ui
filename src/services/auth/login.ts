export const login = async (email:string, password:string): Promise<boolean> => {
    console.log("Logging in...");
    const url = "http://127.0.0.1:8000/user/login";


    const requestBody = {
        email: email,
        password: password,
    };

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
    };

    return fetch(url, requestOptions)
        .then((response) => response.text())
        .then(data => data === "true")
        .catch((error) => {
            console.error("Fetch error: ", error);
            return false;
        });
};
