export interface Body {[k: string]: any};

// const baseURL = process.env.NODE_ENV !== "development" ? process.env.NEXT_PUBLIC_API_URL : "http://localhost:8080";
const baseURL = "http://localhost:8080";
const headers = new Headers({
    'content-type': 'application/json'
});

export async function request(method: "GET"|"POST"|"UPDATE"|"DELETE"|"PUT", route: string, body: Body = {}) {
    const URL = `${baseURL}${route}`;
    
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
    const status = response.status;
    const output = await response.json();

    const ret = {status, output: output};
    return ret;
}