const offerModel=function () {

    const create=function (params) {
        const username=JSON.parse(storage.getData('userInfo')).username;
        let data={
            product:params.product,
            price:Number(params.price),
            description:params.description,
            imageUrl:params.imageUrl
        };
        //POST https://baas.kinvey.com/appdata/app_id/events
        let url= `/appdata/${storage.appKey}/offers`;
        let headers={
            body: JSON.stringify(data),
            headers:{

            }
        };
        return requester.post(url, headers);
    };

    const readAll=function () {
        let url=`/appdata/${storage.appKey}/offers`;
        let headers={
            headers:{
            }
        };
        return requester.get(url, headers);

    };

    const readOne=function (params) {
        let id=params.id;
       let url= `/appdata/${storage.appKey}/offers/${id}`;
       let headers={
           headers:{
           }
       };
       return requester.get(url, headers);

    };

    const update=function (params) {
        let data={
            product:params.product,
            price:Number(params.price),
            description:params.description,
            imageUrl:params.imageUrl
        };
        let url=`/appdata/${storage.appKey}/offers/${params.id}`;
        let headers={
            body:JSON.stringify(data),
            headers:{
            }
        };
        console.log(data);
        return requester.put(url,headers);
    };

    const deleteOffer=function (params) {
        let id= params.id;
        let url=`/appdata/${storage.appKey}/offers/${id}`;
        let headers={
            headers:{
            }
        };
        return requester.del(url,headers);


    };
    return{
        create,
        readAll,
        readOne,
        update,
        deleteOffer
    }
}();