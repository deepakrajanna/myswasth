var testApp = angular.module('testApp', [ 'ngRoute', 'testControllers',
		'ui.bootstrap', 'angularFileUpload', 'testServices' ]);

var testControllers = angular.module('testControllers', []);

var testServices = angular.module('testServices', [ 'ngResource' ]);

testApp.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/test', {
		templateUrl : 'components/test/partials/test.html',
		controller : 'TestCtrl'
	}).when('/test/id/:testId', {
		templateUrl : 'components/test/partials/test-detail.html',
		controller : 'TestDetailCtrl'
	}).when('/test/record', {
		templateUrl : 'components/test/partials/test-record.html',
		controller : 'TestRecordCtrl'
	});
} ]);
