angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {
  var routeRoleChecks = {
    admin: {auth: function(mvAuth) {
      return mvAuth.authorizeCurrentUserForRoute('admin')
    }},
    user: {auth: function(mvAuth) {
      return mvAuth.authorizeAuthenticatedUserForRoute()
    }}
  }

  $locationProvider.html5Mode(true);
  $routeProvider
      .when('/', { templateUrl: '/partials/main/main', controller: 'mvMainCtrl'})
      .when('/admin/users', { templateUrl: '/partials/admin/user-list',
        controller: 'mvUserListCtrl', resolve: routeRoleChecks.admin
      })
      .when('/signup', { templateUrl: '/partials/account/signup',
        controller: 'mvSignupCtrl'
      })
      .when('/profile', { templateUrl: '/partials/account/profile',
        controller: 'mvProfileCtrl', resolve: routeRoleChecks.user
      })
      .when('/courses', { templateUrl: '/partials/courses/course-list',
        controller: 'mvCourseListCtrl'
      })
      .when('/courses/:id', { templateUrl: '/partials/courses/course-details',
        controller: 'mvCourseDetailCtrl'
      })
      .when('/books', { templateUrl: '/partials/books/book-list',
          controller: 'mvBookListCtrl'
      })
      .when('/books/:id', { templateUrl: '/partials/books/book-detail',
          controller: 'mvBookDetailCtrl'
      })

});

angular.module('app').run(function($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
    if(rejection === 'not authorized') {
      $location.path('/');
    }
  })
})
