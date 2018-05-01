angular.module('weaponService', [])

    .factory('Weapon', function ($http) {

        // create a new object
        var weaponFactory = {};

        // Did not get adding a weapon to user working
        weaponFactory.get = function (id) {
            console.log("weaponFactory " + id)
            return $http.get('/api/market/' + id);
        };

        // get all weapons
        weaponFactory.all = function () {
            return $http.get('/api/weapons/');
        };

        // return our entire weaponFactory object
        return weaponFactory;

    });