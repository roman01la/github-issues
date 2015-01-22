let fetch = function (url) {

    return new Promise(function (resolve, reject) {

        let xhr = new XMLHttpRequest();

        xhr.open('GET', url);
        xhr.responseType = 'json';
        xhr.onload = () => {

            if (xhr.status === 200) {

                resolve(xhr.response);
            } else {

                reject(xhr.status);
            }
        };

        xhr.send();
    });
};

export default fetch;
