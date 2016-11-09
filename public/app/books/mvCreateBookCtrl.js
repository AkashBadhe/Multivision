angular.module('app').controller('mvSignupCtrl', function($scope, mvUser, mvNotifier, $location, mvAuth) {

    $scope.signup = function() {
        var newUserData = {
            username: $scope.email,
            password: $scope.password,
            firstName: $scope.fname,
            lastName: $scope.lname
        };

        mvAuth.createUser(newUserData).then(function() {
            mvNotifier.notify('User account created!');
            $location.path('/');
        }, function(reason) {
            mvNotifier.error(reason);
        })
    }
})
//title: 'C# for Sociopaths', featured: true, published: new Date('10/5/2013'), tags: ['C#']

angular.module('app').controller('mvCreateBookCtrl', function($scope, mvUser, mvNotifier, $location, mvAuth){
    $scope.create = function() {
        var newBook = {
            title: $scope.title,
            featured: $scope.featured,
            published: $scope.published,
            tags: $scope.tags
        }
    }
})