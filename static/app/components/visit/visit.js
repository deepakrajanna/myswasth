var visitApp = angular.module('visitApp', [
  'ngRoute',
  'visitControllers',
  'ui.bootstrap',
  'googlechart',
  'angularFileUpload',
  'visitServices'
]);

var visitControllers = angular.module('visitControllers', []);
var visitServices = angular.module('visitServices', ['ngResource']);


visitApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      
      when('/visit', {
        templateUrl: '/static/app/components/visit/partials/visit.html',
        controller: 'VisitCtrl'
      }).
      when('/visit/id/:visitId', {
          templateUrl: '/static/app/components/visit/partials/visit-detail.html',
          controller: 'VisitDetailCtrl'
        }).
      when('/visit/record', {
          templateUrl: '/static/app/components/visit/partials/visit-record.html',
          controller: 'VisitRecordCtrl'
        }).
      when('/visit/record-test', {
          templateUrl: '/static/app/components/visit/partials/visit-record-test.html',
          controller: 'VisitRecordTestCtrl'
        }).
     otherwise({
        redirectTo: '/homepage'
      });
  }]);
