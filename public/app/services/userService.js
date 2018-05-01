angular.module('userService', [])

    .factory('User', function ($http) {

        // create a new object
        var userFactory = {};

        // get a single user
        userFactory.get = function (id) {
            return $http.get('/api/users/' + id);
        };

        // get all users
        userFactory.all = function () {
            return $http.get('/api/users/');
        };

        // create a user
        userFactory.create = function (userData) {
            return $http.post('/api/users/', userData);
        };

        // register a user
        userFactory.create = function (userData) {
            return $http.post('/api/register/', userData);
        };

        // update a user
        userFactory.update = function (id, userData, exp, coins, wins, losses) {
            // create variable Indata and store new data there
            var Indata = { 'user': userData, 'exp': exp, 'coins': coins, 'wins': wins, 'losses': losses };
            // Use .put in api and send new data there
            return $http.put('/api/users/' + id, Indata);
        };

        // delete a user
        userFactory.delete = function (id) {
            return $http.delete('/api/users/' + id);
        };

        // return our entire userFactory object
        return userFactory;

    });