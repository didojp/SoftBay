
//requests to Kinvey. конкретни AJAX заявки към Кинви
const storage=function () {

    const appKey='kid_SkvYRV4XS';
    const appSecret='2cc1894282e649a591d1258fa5a416f7';

    const getData=function (key) {
        return localStorage.getItem(key+appKey);
    };
    const getToken=function () {
        return localStorage.getItem(`authToken+${appKey}`) ;
    };

    const saveData=function (key,value) {
        return localStorage.setItem(key+appKey, JSON.stringify(value));
    };
    const saveUser=function (data) {
        saveData('userInfo',data);
        saveData('authToken', data._kmd.authtoken);
    };
    const deleteUser=function () {
        localStorage.removeItem('userInfo'+appKey);
        localStorage.removeItem('authToken'+ appKey);
    };

    return{
        getData,
        saveData,
        saveUser,
        deleteUser,
        appKey,
        appSecret,
        getToken
    }

}();