angular.module('app.routes', ['ngRoute'])

    .config(function ($routeProvider, $locationProvider) {

        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl: 'app/views/pages/home.html'
            })

            // login page
            .when('/login', {
                templateUrl: 'app/views/pages/login.html',
                controller: 'mainController',
                controllerAs: 'login'
            })

            // show all users
            .when('/users', {
                templateUrl: 'app/views/pages/users/all.html',
                controller: 'userController',
                controllerAs: 'user'
            })

            // form to create a new user as admin
            // same view as edit page
            .when('/users/create', {
                templateUrl: 'app/views/pages/users/single.html',
                controller: 'userCreateController',
                controllerAs: 'user'
            })

            // form to create a new user
            // same view as edit page
            .when('/register', {
                templateUrl: 'app/views/pages/users/single.html',
                controller: 'registerController',
                controllerAs: 'user'
            })

            // page to edit a user
            .when('/users/:user_id', {
                templateUrl: 'app/views/pages/users/single.html',
                controller: 'userEditController',
                controllerAs: 'user'
            })

            // Battle page
            .when('/battleroom/battle/:uname', {
                templateUrl: 'app/views/pages/battleroom/battle.html',
                controller: 'userController',
                controllerAs: 'user'
            })

            // One-on-one page
            .when('/battleroom/oneonone/:username/:uname/:user_id', {
                templateUrl: 'app/views/pages/battleroom/oneonone.html',
                controller: 'userController',
                controllerAs: 'user'
            })

            // My Account page
            .when('/myaccount/:uname', {
                templateUrl: 'app/views/pages/myaccount.html',
                controller: 'userController',
                controllerAs: 'user'
            })

            // show market
            .when('/market/:userid', {
                templateUrl: 'app/views/pages/market.html',
                controller: 'weaponController',
                controllerAs: 'weapon'
            });

        $locationProvider.html5Mode(true);

    });