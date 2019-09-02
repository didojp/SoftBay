
const app= Sammy('#main', function () {

    this.use('Handlebars', 'hbs');

    this.get('#/home', homeController.getHome);

    this.get('#/register', userController.getRegister);
    this.get('#/login', userController.getLogin);
    this.get('#/profile', userController.getProfile);

    this.post('#/register', userController.postRegister);
    this.post('#/login', userController.postLogin);

    this.get('#/logout', userController.logout);

    this.get('#/offers', offerController.viewAll);
    this.get('#/offers/details/:id', offerController.viewOne);
    this.get('#/offers/create',offerController.createGetOffer);
    this.get('#/offers/edit/:id',offerController.editGetOffer);

    this.get('#/offers/deletePrepare/:id', offerController.deletePrepareOffer);
    this.post('#/offers/delete/:id', offerController.deleteOffer);

    this.post('#/offers/create',offerController.createPostOffer);
    this.post('#/offers/edit/:id', offerController.editPostOffer);
    //създай си метод който да препращаща от бутона 'buy' във формата към метод в userController-a

});
(()=>{
    app.run('#/home');
})();