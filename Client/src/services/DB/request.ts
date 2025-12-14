export interface Body {[k: string]: any};

const baseURL = "http://localhost:8080";
const headers = new Headers({
    'content-type': 'application/json'
});

export async function request(method: "GET"|"POST"|"UPDATE"|"DELETE"|"PUT", route: string, body: Body = {}) {
    const URL = `${baseURL}${route}`;
    console.log(URL);
    console.log(body);
    
    let response = null;
    if (method === "GET") {
        response = await fetch(URL, {credentials: "include"});
    }
    else {
        response = await fetch(URL, {
            method: method,
            headers: headers,
            body: JSON.stringify(body),
            credentials: "include"
        });
    }

    return await response.json();
}