var historyApp = angular.module('historyApp', [
  'ngRoute',
  'historyControllers',
  'historyServices',
  'ui.bootstrap',
  'angularFileUpload'
]);

var historyControllers = angular.module('historyControllers', []);
var historyServices = angular.module('historyServices', [ 'ngResource' ]);

historyApp.config(['$routeProvider',
	function($routeProvider) {
	  $routeProvider.
	    when('/history', {
	      templateUrl: 'components/history/partials/history.html',
	      controller: 'HistoryCtrl'
	    });
	}]);
