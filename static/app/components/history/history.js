var historyApp = angular.module('historyApp', [
  'ngRoute',
  'historyControllers',
  'ui.bootstrap',
  'angularFileUpload'
]);

var historyControllers = angular.module('historyControllers', []);

historyApp.config(['$routeProvider',
	function($routeProvider) {
	  $routeProvider.
	    when('/history', {
	      templateUrl: 'components/history/partials/history.html',
	      controller: 'HistoryCtrl'
	    });
	}]);
