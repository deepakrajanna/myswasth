
visitControllers.controller('VisitDetailCtrl', ['$scope', '$routeParams', '$http','Visit',
   function ($scope, $routeParams, $http, Visit) {
	
	alert($routeParams.visitId);
	
	var visit_id = $routeParams.visitId;
	
	var responseVisit = Visit.query({visitId: visit_id});
    
    responseVisit.$promise.then(function(data){
	    var VisitData = angular.fromJson(angular.toJson(data)); 
	    $scope.visit = VisitData;
	});
}]);