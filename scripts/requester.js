const requester= function () {

    const baseURL= 'https://baas.kinvey.com';

    const get=function (url, headers) {
        headers.method="GET";
        return makeRequest(baseURL+ url, headers);
    };

    const post=function (url, headers) {
        headers.method="POST";
        return makeRequest(baseURL+ url, headers);
    };
    const put=function (url, headers) {
        headers.method="PUT";
        return makeRequest(baseURL+url, headers);
    };
    const del=function (url, headers) {
        headers.method="DELETE";
        console.log(url,headers);
        return makeRequest(baseURL+url, headers);

    };
    const makeRequest=function (url, headers) {
        headers.headers["Content-Type"]="application/json";

        if (storage.getData('userInfo') !== null) {
            const token = JSON.parse(storage.getData('authToken'));
            headers.headers["Authorization"] = `Kinvey ${token}`;
        }
        return fetch(url, headers);
    };
    return{
        get,
        post,
        put,
        del,
    }
}();
//5d46c0227e910233edaa64d8