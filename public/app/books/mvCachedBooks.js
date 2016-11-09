angular.module('app').factory('mvCachedBooks', function(mvBook) {
  var bookList;

  return {
    query: function() {
      if(!bookList) {
        bookList = mvBook.query();
      }

      return bookList;
    }
  }
})