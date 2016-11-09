angular.module('app').controller('mvBookDetailCtrl', function($scope, mvCachedBooks, $routeParams) {
  mvCachedBooks.query().$promise.then(function(collection) {
    collection.forEach(function(book) {
      if(book._id === $routeParams.id) {
        $scope.book = book;
      }
    })
  })
});