angular.module('app').factory('mvBook', function($resource) {
    var BookResource = $resource('/api/books/:_id', {_id: "@id"}, {
        update: {method:'PUT', isArray:false}
    });

    return BookResource;
});
//adding comments.