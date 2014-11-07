var homeApp = angular.module('homeApp', [
  'ngRoute',
  'homeControllers',
  'ui.bootstrap',
  'googlechart',
  'angularFileUpload'
]);

var homeControllers = angular.module('homeControllers', []);


homeApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/homepage', {
        templateUrl: '/static/app/components/home/partials/homepage.html',
        controller: 'HomePageCtrl'
      });
  }]);
