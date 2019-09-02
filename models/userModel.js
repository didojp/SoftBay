const userModel=function () {

    const register=function (params) {
        let data={
            username: params.username,
            password: params.password,
            numberOfPurchases: Number(0)
        };
        let url=`/user/${storage.appKey}`;
        let auth= btoa(`${storage.appKey}:${storage.appSecret}`);
        let authString=`Basic ${auth}`;
        let headers={
            body: JSON.stringify(data),
            headers:{
                Authorization: authString
            }
        };

        return requester.post(url, headers);
    };

    const login=function (params) {

        let url=`/user/${storage.appKey}/login`;
        let auth=btoa(`${params.username}:${params.password}`);
        let authString=`Basic ${auth}`;
        let headers={
            headers:{
                Authorization: authString
            },
            body: JSON.stringify({...params})

        };
        return requester.post(url, headers);
    };

    const logout= function () {

        let url = `/user/${storage.appKey}/_logout`;
        let authToken=storage.getToken();
        let headers = {
            headers: {
                Authorization: authToken
            }
        };

        return requester.post(url, headers);
    };

    const readUser= function () {
        let url= `/user/${storage.appKey}/${_id}` //тук трябва да се добави ид на потребителя вероятно.
        let auth=btoa(`${params.username}`);
        let headers={
            headers:{
            }
        };
        return requester.get(url, headers);
    };

    return{
        register,
        login,
        logout
    }
}();