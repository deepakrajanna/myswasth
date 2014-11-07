var historyApp = angular.module('historyApp', [
  'ngRoute',
  'historyControllers',
  'ui.bootstrap',
  'googlechart',
  'angularFileUpload'
]);

var historyControllers = angular.module('historyControllers', []);

historyApp.config(['$routeProvider',
	function($routeProvider) {
	  $routeProvider.
	    when('/history', {
	      templateUrl: '/static/app/components/history/partials/history.html',
	      controller: 'HistoryCtrl'
	    });
	}]);
