var profileApp = angular.module('profileApp', [
  'profileControllers',
]);

var profileControllers = angular.module('profileControllers', []);


profileApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/profile', {
        templateUrl: 'components/profile/partials/profile.html',
        controller: 'ProfileCtrl'
      });
  }]);
