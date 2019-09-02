const userController= function () {

    const getRegister=function (context) {
        context.loadPartials({
            header: 'views/common/header.hbs',
            footer:'views/common/footer.hbs'
        }).then(function () {
            this.partial('views/users/registerPage.hbs');
        })
    };

    const getLogin=function (context) {
        context.loadPartials({
            header: 'views/common/header.hbs',
            footer:'views/common/footer.hbs'
        }).then(function () {
            this.partial('views/users/loginPage.hbs');
        })
    };

    const  getProfile=async function (context) {
        const loggedIn=storage.getData('userInfo')!==null;
        if(loggedIn){
            const username=JSON.parse(storage.getData('userInfo')).username;
            let numberOfPurchases=JSON.parse(storage.getData('userInfo')).numberOfPurchases;
            context.loggedIn= loggedIn;
            context.username=username;
            context.numberOfPurchases=numberOfPurchases;
        }
        let profile=[];
        try {
            let response= await userModel.readUser();
            context.profile = await  response.json();
            console.log(context.profile); //тук да видя какво се връща в профила и има ли го поараметъра 'покупки'
            //след това трябва да заредя инфото във 'userDetails' страницата.
        }catch (e) {
            console.log(e);
        }

        context.loadPartials({
            header: 'views/common/header.hbs',
            footer: 'views/common/footer.hbs'
        }).then(function () {
            this.partial('views/users/userDetails.hbs');
        })

    };

    const postRegister = function (context) {
        // helper.notify('loading');
        userModel.register(context.params)
            .then(helper.handler)
            .then((data)=>{
                // helper.stopNotify();
                // helper.notify('success', 'You just registered successfully');
                storage.saveUser(data);
                context.redirect('#/home');
            })


    };
    const postLogin=function (context) {
        // helper.notify('loading');
        userModel.login(context.params)
            .then(helper.handler)
            .then((data)=>{
                // helper.stopNotify();
                // helper.notify('success', 'You just logged in');
                storage.saveUser(data);
                context.redirect('#/home');
            });

    };

    const logout=function (context) {
        userModel.logout()
            .then(helper.handler)
            .then(()=>{
                storage.deleteUser();
                homeController.getHome(context);
            })
    };
    return{
        getRegister,
        getLogin,
        getProfile,
        postRegister,
        postLogin,
        logout
    }
}();