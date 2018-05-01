angular.module('weaponCtrl', ['userService'])

    .controller('weaponController', function ($scope, Weapon, Auth, User, $routeParams) {

        // Create an array of weapons
        $scope.weapons = [
            { name: "Sword", description: "A basic sword.", damage: "1", price: "23" },
            { name: "Spear", description: "A basic spear.", damage: "2", price: "235" },
            { name: "Excalibur", description: "A magical two-handed sword", damage: "20", price: "3456" },
            { name: "Axe", description: "A basic axe.", damage: "3", price: "67" },
            { name: "Bow", description: "A basic bow.", damage: "4", price: "565" },
            { name: "Knife", description: "A basic knife.", damage: "5", price: "34" },
            { name: "Stick", description: "A basic stick.", damage: "6", price: "878" },
            { name: "Sling", description: "A basic sling.", damage: "7", price: "234" },
            { name: "Mace", description: "A basic mace.", damage: "8", price: "356" },
        ];

        // Function called when "Purchase" is clicked.
        // Couldn't get this working.
        // .get returns null for some reason.
        // It does not find the user by id.
        $scope.buyWeapon = function () {
            $routeParams.user_id = $scope.userid;
            console.log($routeParams.user_id);
            User.get($routeParams.user_id)
                .then(function (data) {
                    userData = data;
                    console.log(userData.username);
                });
        };

    });