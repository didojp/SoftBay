const offerController=function () {


    const viewOne= async function (context) {
        const loggedIn=storage.getData('userInfo')!==null;

        if(loggedIn){
            const username=JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn= loggedIn;
            context.username=username;
        }

          let response=await offerModel.readOne(context.params);
          let offer =await response.json();

          Object.keys(offer).forEach((key)=>{
              context[key]=offer[key]
          });


          context.loadPartials({
            header: 'views/common/header.hbs',
            footer:'views/common/footer.hbs'
        }).then(function () {
            this.partial('views/offers/offerDetails.hbs');
        })

    };

  const viewAll= async function (context) {
      const loggedIn=storage.getData('userInfo')!==null;
      // let isCreator=false;

      if(loggedIn){
          const username=JSON.parse(storage.getData('userInfo')).username;
          const userId=JSON.parse(storage.getData('userInfo')) ._id;
          context.loggedIn= loggedIn;
          context.username=username;
          context.userId=userId;
      }
    //let offers=[];
      try {
          let response = await offerModel.readAll();
          context.offers = await response.json();
          for(let offer of context.offers){
             if(offer._acl.creator===context.userId){
               offer.isCreator=true;
             }
          }
          console.log(context.offers);
      } catch (e) {
          console.log(e);
      }

      context.loadPartials({
          header: 'views/common/header.hbs',
          footer: 'views/common/footer.hbs',
          offerView: 'views/offers/offerView.hbs'
      }).then(function () {
          this.partial('views/offers/viewAll.hbs');

      })

  };

    const createGetOffer=function (context) {
        const loggedIn=storage.getData('userInfo')!==null;

        if(loggedIn){
            const username=JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn= loggedIn;
            context.username=username;
        }
        context.loadPartials({
            header: 'views/common/header.hbs',
            footer:'views/common/footer.hbs'
        }).then(function () {
            this.partial('views/offers/createOffer.hbs');

        })

    };
    const createPostOffer=function (context) {
        const loggedIn=storage.getData('userInfo')!==null;

        if(loggedIn){
            const username=JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn= loggedIn;
            context.username=username;
        }

        offerModel.create(context.params)
            .then(helper.handler)
            .then((data)=>this.redirect('#/offers'));

    };

    const editGetOffer=async function (context) {
        const loggedIn=storage.getData('userInfo')!==null;

        if(loggedIn){
            const username=JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn= loggedIn;
            context.username=username;
        }

        let response= await offerModel.readOne(context.params);
        let offer= await response.json();

        Object.keys(offer).forEach((key)=>{
            context[key]=offer[key]
        });

        context.loadPartials({
            header:'views/common/header.hbs',
            footer: 'views/common/footer.hbs'
        }).then(function () {
            this.partial('views/offers/editOffer.hbs');
        });
    };

    const editPostOffer=function (context) {

        const loggedIn=storage.getData('userInfo')!==null;

        if(loggedIn){
            const username=JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn= loggedIn;
            context.username=username;
        }

        offerModel.update(context.params)
            .then(helper.handler)
            .then((data)=>{context.redirect('#/offers')});
        // this.redirect(`#/offers/details/${_id}`)
    };


    const deletePrepareOffer= async function (context) {
        const loggedIn=storage.getData('userInfo')!==null;

        if(loggedIn){
            const username=JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn= loggedIn;
            context.username=username;
        }

        let response=await offerModel.readOne(context.params);
        let offer =await response.json();

        Object.keys(offer).forEach((key)=>{
            context[key]=offer[key]
        });
        context.loadPartials({
            header: 'views/common/header.hbs',
            footer:'views/common/footer.hbs'
        }).then(function () {
            this.partial('views/offers/deleteOffer.hbs');
        });

    };
    const deleteOffer=  function (context) {
        offerModel.deleteOffer(context.params)
            .then(helper.handler)
            .then((data)=>this.redirect('#/offers'));

    };

    return{
        viewOne,
        viewAll,
        createGetOffer,
        createPostOffer,
        editGetOffer,
        editPostOffer,
        deletePrepareOffer,
        deleteOffer
    }

}();