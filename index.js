function customFetch(url, options={}) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        const method = options.method || 'GET';
        const headers = options.headers || {};
        const body = options.body || null;

        xhr.open(method, url);

        for (const [key, value] of Object.entries(headers)) {
            xhr.setRequestHeader(key, value);
        }

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                try{
                    const responseData = JSON.parse(xhr.responseText);
                    resolve(responseData);
                }catch{
                    reject(new Error('Failed to parse response as JSON'));
                }
            }else {
                reject(new Error(`Request failed with status: ${xhr.status}`));
            }
        };

        xhr.onerror = () => reject(new Error('Network error'));

        xhr.send(body);
    })
}