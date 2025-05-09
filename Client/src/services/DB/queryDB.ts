export interface Body {[k: string]: any};

const baseURL = "http://localhost:5000";
const headers = new Headers({
    'content-type': 'application/json'
});

export async function queryDB(route: string, body: Body, method: string = "POST") {
    console.log(body);
    const URL = `${baseURL}/${route}`;

    let response;
    if (method === "GET") {
        response = await fetch(URL, {method, headers});
    }
    else {
        response = await fetch(URL, {
            method: method,
            headers: headers,
            body: JSON.stringify(body)
        });
    }

    const {output} = await response.json();
    return output;
}