angular.module('userApp', ['app.routes', 'authService', 'mainCtrl', 'userCtrl', 'userService', 'weaponCtrl', 'weaponService'])

    // application configuration to integrate token into requests
    .config(function ($httpProvider) {
        
        // attach our auth interceptor to the http requests
        $httpProvider.interceptors.push('AuthInterceptor');

    });