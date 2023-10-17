export const register = async (email:string, password:string): Promise<any> => {
    console.log("Creating account...");
    const url = "http://127.0.0.1:8000/user/create";

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
        .then((response) => {
            response.ok ? response.json() : alert("Registration failed");
        })
        .then(data => data)
        .catch((error) => {
            console.error("Fetch error: ", error);
            return false;
        });
};
