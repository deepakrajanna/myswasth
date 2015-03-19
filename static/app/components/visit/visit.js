var visitApp = angular.module('visitApp', [ 'ngRoute', 'visitControllers',
		'ui.bootstrap', 'angularFileUpload', 'visitServices' ]);

var visitControllers = angular.module('visitControllers', []);
var visitServices = angular.module('visitServices', [ 'ngResource' ]);

visitApp.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.

	when('/visit', {
		templateUrl : 'components/visit/partials/visit.html',
		controller : 'VisitCtrl'
	}).when('/visit/id/:visitId', {
		templateUrl : 'components/visit/partials/visit-detail.html',
		controller : 'VisitDetailCtrl'
	}).when('/visit/record', {
		templateUrl : 'components/visit/partials/visit-record.html',
		controller : 'VisitRecordCtrl'
	}).otherwise({
		redirectTo : '/homepage'
	});
} ]);
