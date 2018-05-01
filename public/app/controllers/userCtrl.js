angular.module('userCtrl', ['userService'])

    .controller('userController', function (User, $scope, Auth, $routeParams, $location, $filter) {

        var vm = this;

        // Create fighters
        $scope.fighter1;
        $scope.fighter2;

        // get user information on page load
        Auth.getUser()
            .then(function (response) {
                vm.user = response.data;
                $scope.uname = vm.user.username;
            });

        $scope.username = $routeParams.username;

        // set a processing variable to show loading things
        vm.processing = true;

        // grab all the users at page load
        User.all()
            .then(function (data) {

                // when all the users come back, remove the processing variable
                vm.processing = false;

                // bind the users that come back to vm.users
                vm.users = data.data;
                console.log(vm.users);
            });

        // function to delete a user
        vm.deleteUser = function (id) {
            vm.processing = true;

            User.delete(id)
                .then(function (data) {

                    // get all users to update the table
                    // you can also set up your api
                    // to return the list of users with the delete call
                    User.all()
                        .then(function (data) {
                            vm.processing = false;
                            vm.users = data;
                        });

                });
        };

        Auth.getUser()
            .then(function (response) {
                vm.user = response.data;
                $scope.uname = vm.user.username;
            });

        User.all()
            .then(function (data) {

                // when all the users come back, remove the processing variable
                vm.processing = false;

                // bind the users that come back to vm.users
                vm.users = data.data;
                console.log(vm.users);
            });

        // This function is called when battle starts.
        // Fighters healths are set to 100.
        $scope.initBattle = function () {

            $scope.fighter1 = ($filter('filter')(vm.users, { username: $scope.uname }));
            $scope.fighter2 = ($filter('filter')(vm.users, { username: $scope.username }));
            $scope.fighter1 = $scope.fighter1[0];
            $scope.fighter2 = $scope.fighter2[0];
            $scope.fighter1.health = 100;
            $scope.fighter1.health = 100;

            $scope.victory = false;
            $scope.loss = false;
        }

        // This function is invoked when player clicks VICTORY button
        $scope.battleWon = function () {
            
            $scope.fighter1 = ($filter('filter')(vm.users, { username: $scope.uname }));
            $scope.fighter1 = $scope.fighter1[0];

            // Display reward message
            alert($scope.fighter1.name + ' received 200 experience points and 100 coins for the win!');

            var id = $scope.fighter1._id
            
            // $routeParams is the way we grab data from the URL
            User.get($routeParams.user_id)
                .then(function (data) {
                    vm.userData = data;

                    // Set variables exp, coins and wins
                    var exp = 200;
                    var coins = 100;
                    var wins = 1;
                    var losses = 0;

                    // call the userService function to update.
                    // Pass exp, coins and wins along
                    User.update(id, vm.userData, exp, coins, wins, losses)
                        .then(function (data) {
                            vm.processing = false;

                            // clear the form
                            vm.userData = {};

                            // bind the message from our API to vm.message
                            vm.message = data.message;
                        });
                });
        }
        
        // This function is invoked when player clicks the LOSS button
        $scope.battleLost = function () {

            $scope.fighter1 = ($filter('filter')(vm.users, { username: $scope.uname }));
            $scope.fighter1 = $scope.fighter1[0];

            // Display reward
            alert($scope.fighter1.name + ' received 20 experience points and 10 coins for the loss!');

            var id = $scope.fighter1._id
            
            // $routeParams is the way we grab data from the URL
            User.get($routeParams.user_id)
                .then(function (data) {
                    vm.userData = data;

                    // Set variables exp, coins and wins
                    var exp = 20;
                    var coins = 10;
                    var wins = 0;
                    var losses = 1;

                    // call the userService function to update.
                    // Pass exp, coins and wins along
                    User.update(id, vm.userData, exp, coins, wins, losses)
                        .then(function (data) {
                            vm.processing = false;

                            // clear the form
                            vm.userData = {};

                            // bind the message from our API to vm.message
                            vm.message = data.message;
                        });
                });
        }

        // This function checks if one of the gladiators is dead.
        // If dead, set variable dead to true. The variable is used to
        // hide disable attack buttons if the battle has already ended
        $scope.deadChecker = function () {

            $scope.fighter1 = ($filter('filter')(vm.users, { username: $scope.uname }));
            $scope.fighter2 = ($filter('filter')(vm.users, { username: $scope.username }));
            $scope.fighter1 = $scope.fighter1[0];
            $scope.fighter2 = $scope.fighter2[0];

            // Set victory and loss
            $scope.victory = false;
            $scope.loss = false;

            // Display loss message
            if ($scope.fighter1.health <= 0) {
                alert($scope.fighter2.name + ' won! Click the LOSS button to continue.');
                $scope.loss = true;
            }
            // Display victory message
            if ($scope.fighter2.health <= 0) {
                alert($scope.fighter1.name + ' won! Click the VICTORY button to continue.');
                $scope.victory = true;
            }
        }

        // The main attack function.
        $scope.fighterAttack = function (attackType) {

            $scope.fighter1 = ($filter('filter')(vm.users, { username: $scope.uname }));
            $scope.fighter2 = ($filter('filter')(vm.users, { username: $scope.username }));
            $scope.fighter1 = $scope.fighter1[0];
            $scope.fighter2 = $scope.fighter2[0];

            // Generate a random integer and assign to attackRandomizer variable
            var attackRandomizer = Math.floor(Math.random() * 3) + 1;

            // Create enemyWeapon, orgDamage and enemyOrgDamage variables.
            var enemyWeapon;
            var enemyDamage;
            var orgDamage = $scope.fighter1.damage;
            var enemyOrgDamage = $scope.fighter2.damage;

            // The more experience the fighters have, the more damage they do
            if ($scope.fighter1.exp > 3400) {
                $scope.fighter1.damage = Math.round($scope.fighter1.damage * 1.4) / 1;
            }
            else if ($scope.fighter1.exp > 2400) {
                $scope.fighter1.damage = Math.round($scope.fighter1.damage * 1.4) / 1;
            }
            else if ($scope.fighter1.exp > 1600) {
                $scope.fighter1.damage = Math.round($scope.fighter1.damage * 1.3) / 1;
            }
            else if ($scope.fighter1.exp > 1000) {
                $scope.fighter1.damage = Math.round($scope.fighter1.damage * 1.2) / 1;
            }
            else if ($scope.fighter1.exp > 500) {
                $scope.fighter1.damage = Math.round($scope.fighter1.damage * 1.1) / 1;
            }

            if ($scope.fighter1.exp > 3400) {
                $scope.fighter1.damage = Math.round($scope.fighter1.damage * 1.4) / 1;
            }
            else if ($scope.fighter2.exp > 500) {
                $scope.fighter2.damage = Math.round($scope.fighter2.damage * 1.1) / 1;
            }
            else if ($scope.fighter2.exp > 1000) {
                $scope.fighter2.damage = Math.round($scope.fighter2.damage * 1.2) / 1;
            }
            else if ($scope.fighter2.exp > 1600) {
                $scope.fighter2.damage = Math.round($scope.fighter2.damage * 1.3) / 1;
            }
            else if ($scope.fighter2.exp > 2400) {
                $scope.fighter2.damage = Math.round($scope.fighter2.damage * 1.4) / 1;
            }

            // Depending on the random integer that was generated earlier,
            // assign a weapon to enemyWeapon and determine damage
            if (attackRandomizer == 1) {
                enemyAttack = 'Two-handed sword';
                enemyDamage = $scope.fighter2.damage;
            }
            if (attackRandomizer == 2) {
                enemyAttack = 'Sword and shield';
                enemyDamage = $scope.fighter2.damage;
            }
            if (attackRandomizer == 3) {
                enemyAttack = 'Spear';
                enemyDamage = $scope.fighter2.damage;
            }

            // Based on what attack the user chose and what random weapon
            // was assigned to enemy, determine how much damage is done.
            // A popup message stating the weapons used, damage done and
            // current health is displayed.
            if (attackType == enemyAttack) {
                alert('The gladiators attacks block each other!');
            }
            else if (attackType == 'Spear') {

                if (enemyAttack == 'Two-handed sword') {

                    $scope.fighter2.health = $scope.fighter2.health - $scope.fighter1.damage;

                    alert($scope.fighter1.name + ' did ' + $scope.fighter1.damage + ' damage to ' + $scope.fighter2.name +
                        ' using ' + attackType + '! ' + $scope.fighter2.name + ' now has ' + $scope.fighter2.health + ' health left.');

                    $scope.fighter1.damage = orgDamage;

                    // After every attack, check if either fighter's health has reached 0.'
                    $scope.deadChecker();
                } else {
                    $scope.fighter1.health = $scope.fighter1.health - $scope.fighter2.damage;

                    alert($scope.fighter2.name + ' did ' + $scope.fighter2.damage + ' damage to ' + $scope.fighter1.name +
                        ' using ' + enemyAttack + '! ' + $scope.fighter1.name + ' now has ' + $scope.fighter1.health + ' health left.');

                    $scope.fighter1.damage = orgDamage;
                    $scope.deadChecker();

                }
            } else if (attackType == 'Sword and shield') {

                if (enemyAttack == 'Spear') {

                    $scope.fighter2.health = $scope.fighter2.health - $scope.fighter1.damage;

                    alert($scope.fighter1.name + ' did ' + $scope.fighter1.damage + ' damage to ' + $scope.fighter2.name +
                        ' using ' + attackType + '! ' + $scope.fighter2.name + ' now has ' + $scope.fighter2.health + ' health left.');

                    $scope.fighter1.damage = orgDamage;
                    $scope.deadChecker();

                } else {
                    $scope.fighter1.health = $scope.fighter1.health - $scope.fighter2.damage;

                    alert($scope.fighter2.name + ' did ' + $scope.fighter2.damage + ' damage to ' + $scope.fighter1.name +
                        ' using ' + enemyAttack + '! ' + $scope.fighter1.name + ' now has ' + $scope.fighter1.health + ' health left.');

                    $scope.fighter1.damage = orgDamage;
                    $scope.deadChecker();

                }
            } else if (attackType == 'Two-handed sword') {

                if (enemyAttack == 'Sword and shield') {

                    $scope.fighter2.health = $scope.fighter2.health - $scope.fighter1.damage;

                    alert($scope.fighter1.name + ' did ' + $scope.fighter1.damage + ' damage to ' + $scope.fighter2.name +
                        ' using ' + attackType + '! ' + $scope.fighter2.name + ' now has ' + $scope.fighter2.health + ' health left.');

                    $scope.fighter1.damage = orgDamage;
                    $scope.deadChecker();

                } else {
                    $scope.fighter1.health = $scope.fighter1.health - $scope.fighter2.damage;

                    alert($scope.fighter2.name + ' did ' + $scope.fighter2.damage + ' damage to ' + $scope.fighter1.name +
                        ' using ' + enemyAttack + '! ' + $scope.fighter1.name + ' now has ' + $scope.fighter1.health + ' health left.');

                    $scope.fighter1.damage = orgDamage;
                    $scope.deadChecker();

                }
            }
        };
    })


    // controller applied to user registration page
    .controller('registerController', function (User) {

        var vm = this;

        // variable to hide/show elements of the view
        // differentiates between create, edit or register pages
        vm.type = 'register';

        // function to create a user
        vm.saveUser = function () {
            vm.processing = true;
            vm.message = '';

            // use the create function in the userService
            User.create(vm.userData)
                .then(function (data) {
                    vm.processing = false;
                    vm.userData = {};
                    vm.message = data.message;
                });

        };

    })
    

    // controller applied to user edit page
    .controller('userEditController', function ($routeParams, User) {

        var vm = this;

        // variable to hide/show elements of the view
        // differentiates between create, edit or register pages
        vm.type = 'edit';

        // get the user data for the user you want to edit
        // $routeParams is the way we grab data from the URL
        User.get($routeParams.user_id)
            .then(function (data) {
                vm.userData = data;
            });

        // function to save the user
        vm.saveUser = function () {
            vm.processing = true;
            vm.message = '';

            // call the userService function to update
            User.update($routeParams.user_id, vm.userData)
                .then(function (data) {
                    vm.processing = false;

                    // clear the form
                    vm.userData = {};

                    // bind the message from our API to vm.message
                    vm.message = data.message;
                });
        };

    });