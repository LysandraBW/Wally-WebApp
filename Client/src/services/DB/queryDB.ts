export interface Body {[k: string]: any};

const baseURL = "http://localhost:8080";
const headers = new Headers({
    'content-type': 'application/json'
});

export async function queryDB(route: string, body: Body, method: string = "POST") {
    const URL = `${baseURL}/${route}`;
    console.log(URL);

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

    const {output} = await response.json();
    return output;
}