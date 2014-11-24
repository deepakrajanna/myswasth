var profileApp = angular.module('profileApp', [
  'ngRoute',
  'profileControllers',
  'ui.bootstrap',
  'googlechart',
  'angularFileUpload'
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
