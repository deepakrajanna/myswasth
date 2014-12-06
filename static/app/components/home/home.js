var homeApp = angular.module('homeApp', [
  'ngRoute',
  'homeControllers',
  'ui.bootstrap',
  'angularFileUpload',
  'homeServices'
]);

var homeControllers = angular.module('homeControllers', []);
var homeServices = angular.module('homeServices', ['ngResource']);

homeApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/homepage', {
        templateUrl: 'components/home/partials/homepage.html',
        controller: 'HomePageCtrl'
      });
  }]);
