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
        templateUrl: 'components/test/partials/test.html',
        controller: 'TestCtrl'
      }).
      when('/test/record', {
          templateUrl: 'components/test/partials/test-record.html',
          controller: 'TestRecordCtrl'
        });
  }]);
