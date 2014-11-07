var testApp = angular.module('testApp', [
  'ngRoute',
  'testControllers',
  'ui.bootstrap',
  'googlechart',
  'angularFileUpload'
]);

var testControllers = angular.module('testControllers', []);


testApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/test', {
        templateUrl: '/static/app/components/test/partials/test.html',
        controller: 'TestCtrl'
      }).
      when('/test/record', {
          templateUrl: '/static/app/components/test/partials/test-record.html',
          controller: 'TestRecordCtrl'
        });
  }]);
