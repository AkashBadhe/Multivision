angular.module('app').controller('mvBookListCtrl', function($scope, mvCachedBooks) {
    $scope.books = mvCachedBooks.query();

    $scope.sortOptions = [{value:"title",text: "Sort by Title"},
        {value: "published",text: "Sort by Publish Date"}];
    $scope.sortOrder = $scope.sortOptions[0].value;
});