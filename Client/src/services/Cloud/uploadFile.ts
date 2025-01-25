export async function uploadFile(url: string, data: File): Promise<string> {
    try {
        await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: data
        });
    }
    catch (err) {
        console.error(err);
        return '';
    }

    const imageURL = url.split('?')[0];
    return imageURL;
}