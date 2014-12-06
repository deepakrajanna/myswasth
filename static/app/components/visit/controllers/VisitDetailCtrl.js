
visitControllers.controller('VisitDetailCtrl', ['$scope', '$routeParams', '$http','Visit','$rootScope',
   function ($scope, $routeParams, $http, Visit, $rootScope) {
	
	alert($routeParams.visitId);
	alert($rootScope.selected.name);
	var visit_id = $routeParams.visitId;
	
	var responseVisit = Visit.query({visitId: visit_id});
    
    responseVisit.$promise.then(function(data){
	    var VisitData = angular.fromJson(angular.toJson(data)); 
	    $scope.visit = VisitData;
	});
}]);