var historyApp = angular.module('historyApp', [
  'historyControllers',
  'historyServices']);

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
